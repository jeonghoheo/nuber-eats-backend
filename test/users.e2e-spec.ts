import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { getConnection, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Verification } from 'src/users/entities/verification.entity';
import { query } from 'express';

jest.mock('got', () => ({
  post: jest.fn(),
}));

const GRAPHQL_ENDPOINT = '/graphql';
const testUser = {
  email: 'choco@let.com',
  password: '123123',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let verificationRepository: Repository<Verification>;
  let jwtToken: string;

  const baseTest = () => request(app.getHttpServer()).post(GRAPHQL_ENDPOINT);
  const publicTest = (query: string) => baseTest().send({ query });
  const privateTest = (query: string) =>
    baseTest().set('X-JWT', jwtToken).send({ query });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    verificationRepository = module.get<Repository<Verification>>(
      getRepositoryToken(Verification),
    );
    await app.init();
  });

  afterAll(async () => {
    await getConnection().dropDatabase();
    app.close();
  });

  describe('createAccount', () => {
    it('should create account', () => {
      const query = `
      mutation {
        createAccount(input:{
          email: "${testUser.email}"
          password: "${testUser.password}"
          role: Owner
        }) {
          ok
          error
        }
      }
    `;
      return publicTest(query)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createAccount.ok).toBeTruthy();
          expect(res.body.data.createAccount.error).toBeNull();
        });
    });

    it('should fail if account already exists', () => {
      const query = `
            mutation {
              createAccount(input:{
                email: "${testUser.email}"
                password: "${testUser.password}"
                role: Owner
              }) {
                ok
                error
              }
            }
          `;
      return publicTest(query)
        .expect(200)
        .expect((res) => {
          const { ok, error } = res.body.data.createAccount;
          expect(ok).toBeFalsy();
          expect(error).toBe('There is a user with that email already');
        });
    });
  });
  describe('login', () => {
    it('should login with correct credentials', () => {
      const query = `
      mutation {
        login(input: {
          email: "${testUser.email}",
          password: "${testUser.password}"
        }) {
          ok
          error
          token
        }
      }
      `;
      return publicTest(query)
        .expect(200)
        .expect((res) => {
          const { ok, error, token } = res.body.data.login;
          expect(ok).toBeTruthy();
          expect(error).toBeNull();
          expect(token).toEqual(expect.any(String));
          jwtToken = token;
        });
    });

    it('should not able to login with wrong credentials', () => {
      const query = `
      mutation {
        login(input: {
          email: "${testUser.email}",
          password: "xxx"
        }) {
          ok
          error
          token
        }
      }
      `;
      return publicTest(query)
        .expect(200)
        .expect((res) => {
          const { ok, error, token } = res.body.data.login;
          expect(ok).toBeFalsy();
          expect(error).toBe('Wrong password');
          expect(token).toBeNull();
        });
    });
  });

  describe('userProfile', () => {
    let userId: number;
    beforeAll(async () => {
      const [user] = await userRepository.find();
      userId = user.id;
    });
    it("should see a user's profile", () => {
      const query = `
      query {
        userProfile(userId: ${userId}) {
          ok
          error
          user {
            id
          }
        }
      }
    `;
      return privateTest(query)
        .expect(200)
        .expect((res) => {
          const { ok, error, user } = res.body.data.userProfile;
          expect(ok).toBeTruthy();
          expect(error).toBeNull();
          expect(user.id).toBe(userId);
        });
    });

    it('should not find a profile', () => {
      const query = `
      query {
        userProfile(userId: 222) {
          ok
          error
          user {
            id
          }
        }
      }
    `;
      return privateTest(query)
        .expect(200)
        .expect((res) => {
          const { ok, error, user } = res.body.data.userProfile;
          expect(ok).toBeFalsy();
          expect(error).toBe('User Not Found');
          expect(user).toBeNull();
        });
    });
  });

  describe('me', () => {
    it('should find my profile', () => {
      const query = `
      {
        me {
          email
        }
      }
      `;
      return privateTest(query)
        .expect(200)
        .expect((res) => {
          const { email } = res.body.data.me;
          expect(email).toBe(testUser.email);
        });
    });

    it('should not allow logged out user', () => {
      const query = `
      {
        me {
          email
        }
      }
      `;
      return publicTest(query)
        .expect(200)
        .expect((res) => {
          const [error] = res.body.errors;
          expect(error.message).toBe('Forbidden resource');
        });
    });
  });
  describe('editProfile', () => {
    const NEW_EMAIL = 'choco@new.com';
    it('should change email', () => {
      const query = `
      mutation {
        editProfile(input: {
          email: "${NEW_EMAIL}"
        }) {
          ok
          error
        }
      }
      `;
      return privateTest(query)
        .expect(200)
        .expect((res) => {
          const { ok, error } = res.body.data.editProfile;
          expect(ok).toBeTruthy();
          expect(error).toBeNull();
        });
    });
    it('should have a new email', () => {
      const query = `
      {
        me {
          email
        }
      }
      `;
      return privateTest(query)
        .expect(200)
        .expect((res) => {
          const { email } = res.body.data.me;
          expect(email).toBe(NEW_EMAIL);
        });
    });
  });

  describe('verifyEmail', () => {
    let verificationCode: string;
    beforeAll(async () => {
      const [verification] = await verificationRepository.find();
      verificationCode = verification.code;
    });
    it('should verify email', () => {
      const query = `
      mutation {
        verifyEmail(input: {
          code: "${verificationCode}"
        }) {
          ok
          error
        }
      }
      `;
      return publicTest(query)
        .expect(200)
        .expect((res) => {
          const { ok, error } = res.body.data.verifyEmail;
          expect(ok).toBeTruthy();
          expect(error).toBeNull();
        });
    });
    it('should fail on verification code no found', () => {
      const query = `
      mutation {
        verifyEmail(input: {
          code: "xxxx"
        }) {
          ok
          error
        }
      }
      `;
      return publicTest(query)
        .expect(200)
        .expect((res) => {
          const { ok, error } = res.body.data.verifyEmail;
          expect(ok).toBeFalsy();
          expect(error).toBe('Could not verify email.');
        });
    });
  });
});

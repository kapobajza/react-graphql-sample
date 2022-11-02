import { injectable } from 'tsyringe';

import { UserWithTokens, LoginRequest, RegisterRequest } from '../types/models';

import { AxiosService } from './Axios.service';

export interface IAuthService {
  login(params: LoginRequest): Promise<UserWithTokens>;
  register(params: RegisterRequest): Promise<UserWithTokens>;
}

@injectable()
export class AuthService extends AxiosService implements IAuthService {
  register(params: RegisterRequest): Promise<UserWithTokens> {
    return this.postRequest('register', { body: params });
  }

  login(params: LoginRequest): Promise<UserWithTokens> {
    return this.postRequest('login', { body: params });
  }
}

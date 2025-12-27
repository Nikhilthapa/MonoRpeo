import { DomainEvent } from './event.types';

export interface UserCreatedPayload {
  userId: string;
  email: string;
  tenantId?: string;
}

export interface UserUpdatedPayload {
  userId: string;
  changes: Record<string, any>;
}

export interface UserDeletedPayload {
  userId: string;
  tenantId?: string;
}

export interface AuthLoginPayload {
  userId: string;
  email: string;
  tenantId?: string;
  ipAddress?: string;
}

export interface AuthLogoutPayload {
  userId: string;
  tenantId?: string;
}

export type UserCreatedEvent = DomainEvent<UserCreatedPayload>;
export type UserUpdatedEvent = DomainEvent<UserUpdatedPayload>;
export type UserDeletedEvent = DomainEvent<UserDeletedPayload>;
export type AuthLoginEvent = DomainEvent<AuthLoginPayload>;
export type AuthLogoutEvent = DomainEvent<AuthLogoutPayload>;

export const AUTH_EVENTS = {
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
  AUTH_LOGIN: 'auth.login',
  AUTH_LOGOUT: 'auth.logout',
} as const;

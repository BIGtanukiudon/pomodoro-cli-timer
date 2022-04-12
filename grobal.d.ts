/* eslint-disable no-unused-vars */
/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly WORK_MINUTES: number;
    readonly REST_MINUTES: number;
    readonly TERM: number;
    readonly IS_NOTIFICATION_SOUND: number;
  }
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  FAILED = 'FAILED', // this means that the task has not been completed in the given duration
  ABANDONED = 'ABANDONED', // means user just quit
}

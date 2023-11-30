export function appStatus(statusValue) {
  return {
    type: 'APP_STATUS',
    payload: statusValue,
  };
}

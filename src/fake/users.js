
export const users = [{
  _id: '0',
  name: 'Gary Ascuy',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}, {
  _id: '1',
  name: 'Yrag Ascuy',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}]

export function getUser (_id) {
  return users[parseInt(_id, 10)] || users[0]
}

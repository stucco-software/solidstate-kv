import localPersister from './local-persister'
import {
  put, post, patch, clear, getEntity, getAll, deleteStatements
} from './crud'

const configureStore = async (config) => {
  switch(true) {
    case Array.isArray(config):
      return "Array of Server Configs";
    default:
      return await localPersister()
  }
}

const SolidState = async (config) => {
  const {persist, getter} = await configureStore(config)
  return {
    version: "0.0.1",
    persister: persist,
    getter: getter,
    post: post(persist, getter),
    put: put(persist, getter),
    patch: patch(persist, getter),
    get: getEntity(getter),
    getAll: getAll(getter),
    delete: deleteStatements(persist, getter),
    clear: clear(persist)
  }
}
export default SolidState
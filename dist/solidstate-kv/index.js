import localPersister from './local-persister'
import {
  put, post, patch, clear, getEntity, getAll, deleteStatements
} from './crud'

const configureStore = (config) => {
  switch(true) {
    case Array.isArray(config):
      return "Array of Server Configs";
    default:
      return localPersister()
  }
}

const SolidState = (config) => {
  const {persist, getter} = configureStore(config)
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
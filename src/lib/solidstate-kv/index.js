import localPersister from './local-persister'
import {
  put, post, clear, getEntity
} from './crud'

const configureStore = (config) => {
  switch(true) {
    case Array.isArray(config):
      return "Array of Server Configs";
    default:
      return localPersister()
  }
}

const SolidState = async (config) => {
  const {persist, getter} = configureStore(config)
  return {
    version: "0.0.1",
    persister: persist,
    post: post(persist, getter),
    put: put(persist, getter),
    get: getEntity(persist),
    clear: clear(persist)
  }
}
export default SolidState
import { ElMessage, MessageParams } from "element-plus"

const success = (str: string) => {
    ElMessage.closeAll()
    ElMessage.success(str)
}
const info = (str: string) => {
    ElMessage.closeAll()
    ElMessage.info(str)
}
const warning = (str: string) => {
    ElMessage.closeAll()
    ElMessage.warning(str)
}
const error = (str: string) => {
    ElMessage.closeAll()
    ElMessage.error(str)
}

const Message = function (config: MessageParams) {
    ElMessage(config)
}
Message.success = success
Message.info = info
Message.warning = warning
Message.error = error

export default Message




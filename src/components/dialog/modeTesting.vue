<template>
    <div class="chat-container">
        <div class="chat-header">
            <h2>测试界面</h2>
        </div>
        <div class="chat-body">
            <div v-for="(message, index) in messagesArr" :key="index" class="chat-message"
                :class="{ 'sent': message.sentBy === 'question', 'received': message.sentBy !== 'question' }">
                <div class="message-content">
                    {{ message.text }}
                </div>
                <div class="message-timestamp">{{ message.timestamp }}</div>
            </div>
        </div>
        <div class="chat-input">
            <el-input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息..." />
            <el-button type="primary" @click="sendMessage()">发送</el-button>
            <el-button type="primary" :disabled="messagesArr.length == 0" @click="testAi()">测试</el-button>
            <el-button type="primary" :disabled="messagesArr.length == 0" @click="clearMessage()">清空</el-button>
        </div>
    </div>
</template>  
    
<script lang="ts" setup>
import { ref } from 'vue';
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { testAiMode1, testAiMode2 } from "@/utils/api";
import { ElMessage, ElMessageBox } from "element-plus";

const props = defineProps({
    type: String,
    modelKey: String,
    modelList: Array
})

const emits = defineEmits(['search'])

const messagesArr = ref([]) as any;
const newMessage = ref('');
const sendMessage = () => {
    if (newMessage.value) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messagesArr.value.push({ text: newMessage.value, sentBy: 'question', timestamp });
        newMessage.value = ''; // 清空输入框  
    }

};

//模型测试
const testAi = async () => {
    let message = '';
    messagesArr.value.forEach((item: any) => {
        if (item.sentBy == 'question') {
            message = item.text;
        }
    })
    if (Number(props.type) == 1) {
        console.log('props', props);
        let params = {
            messages: message,
            model_id: props.modelKey
        }
        let data = await testAiMode1(params);
        console.log('data', data);
        if (data.is_success == 1) {
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            messagesArr.value.push({
                text: data.message_res,
                timestamp
            })
        }
    } else {
        console.log('props.model_key_id_list.length', props.modelList);
        if (props.modelList.length == 0) {
            ElMessage({
                type: "info",
                message: "请选择要测试的key",
            });
            return
        }


        let params = {
            messages: message,
            model_id: props.modelKey,
            model_key_list: props.modelList
        }


        let data = await testAiMode2(params);
        ElMessage({
            type: "info",
            message: "请稍等片刻后查看测试结果",
        });
        setTimeout(() => {
            emits("search");
        }, 5000)
    }

}

//清空消息
const clearMessage = () => {
    messagesArr.value = [];
}

defineExpose({
    clearMessage
});
</script>  

<style scoped lang="scss">
.chat-container {
    display: flex;
    flex-direction: column;
    height: 500px;
}

.chat-header {
    padding: 10px;
    background-color: #f2f2f2;
}

.chat-body {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    width: 100%;
    border: 1px solid #f2f2f2;
    background: grey;
}

.chat-message {
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    max-width: 60%;
    clear: both;
}

.sent {
    background-color: #fff;
    align-self: flex-end;
}

.received {
    background-color: #b2e281;
    align-self: flex-start;
    float: right;
}

.message-content {
    word-break: break-all;
}

.message-timestamp {
    font-size: 10px;
    color: #999;
    margin-top: 5px;
}

.chat-input {
    padding: 10px;
    background-color: #f2f2f2;
    display: flex;
    justify-content: space-between;
}

.chat-input input {
    flex: 1;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.chat-input button {
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    color: #fff;
    cursor: pointer;
}
</style>
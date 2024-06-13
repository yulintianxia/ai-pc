<template>
    <div class="chat-container">
        <div class="chat-header">
            <h2>测试界面</h2>
        </div>
        <div class="chat-body">
            <div v-for="(message, index) in messages" :key="index" class="chat-message"
                :class="{ 'sent': message.sentBy === 'me', 'received': message.sentBy !== 'me' }">
                <div class="message-content">
                    {{ message.text }}
                </div>
                <div class="message-timestamp">{{ message.timestamp }}</div>
            </div>
        </div>
        <div class="chat-input">
            <el-input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息..." />
            <el-button type="primary" @click="sendMessage()">一键发送</el-button>
        </div>
    </div>
</template>  
    
<script lang="ts" setup>
import { ref } from 'vue';

const messages = ref([
    { text: '你好，这是测试消息1', sentBy: 'me',  timestamp: '10:00' },
    { text: '你好，这是测试消息2', sentBy: 'other', timestamp: '10:01' },
]);
const newMessage = ref('');
const sendMessage = () => {
    if (newMessage.value) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messages.value.push({ text: newMessage.value, sentBy: 'me', timestamp });
        newMessage.value = ''; // 清空输入框  
    }
};

console.log('ceshi1')

</script>  
    
<style scoped lang="scss">
.chat-container {
    display: flex;
    flex-direction: column;
    height:500px;
}

.chat-header {
    padding: 10px;
    background-color: #f2f2f2;
}

.chat-body {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    width:100%;
    border:1px solid #f2f2f2;
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
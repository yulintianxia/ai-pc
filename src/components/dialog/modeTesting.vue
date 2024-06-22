<template>
    <div class="chat-container">
        <!-- <div class="chat-header">
            <h2>测试界面</h2>
        </div> -->
        <div class="chat-body">
            <div v-for="(message, index) in messagesArr" :key="index" class="chat-message"
                :class="{ 'sent': message.sentBy === 'question', 'received': message.sentBy !== 'question' }">
                <div class="message-content">
                    {{ message.text }}
                </div>
            </div>
        </div>
        <div class="chat-input">
            <el-input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息..." />
            <el-button class="sendMsgBtn" type="primary" :disabled="newMessage.length == 0" @click="sendMessage()">发送</el-button>
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

const getMessage = (row) => {
    messagesArr.value = [];
    if (row.test_answer) {
        messagesArr.value.push(
            {
                text: row.test_question,
                sentBy: 'question'
            },
            {
                text: row.test_answer,
                sentBy: 'answer'
            },
        )
    } else {
        ElMessage({
            type: "warning",
            message: "暂无测试结果",
        });

    }
}

const sendMessage = async () => {
    if (Number(props.type) == 1) {
        let params = {
            messages: newMessage.value,
            model_id: props.modelKey
        }
        let data = await testAiMode1(params);
        messagesArr.value.push(
            {
                text: newMessage.value,
                sentBy: 'question'
            },
            {
                text: data.message_res,
                sentBy: 'answer'
            })
    } else {
        if (props.modelList.length == 0) {
            ElMessage({
                type: "info",
                message: "请选择要测试的key",
            });
            return
        }
        let params = {
            messages: newMessage.value,
            model_id: props.modelKey,
            model_key_list: props.modelList
        }
        let data = await testAiMode2(params);
        ElMessage({
            type: "warning",
            message: "请稍等片刻后点击列表查看结果",
        });

        setTimeout(() => {
            emits("search");
        }, 5000)
    }
    newMessage.value = '';
};



//清空消息
const clearMessage = () => {
    messagesArr.value = [];
}

defineExpose({
    clearMessage,
    getMessage
});
</script>  

<style scoped lang="scss">
.chat-container {
    display: flex;
    flex-direction: column;
    height: 252px;
}

.chat-header {
    padding: 5px;
    background-color: #f2f2f2;
    font-size: 15px;
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
    margin-left:5px;
}
</style>
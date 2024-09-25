const stateOptions  = [
  {  
    label:'未开始',
    value:0,
  },
  {  
    label:'生成中',
    value:1,
  },
  {  
    label:'暂停中',
    value:2,
  },
  {  
    label:'已暂停',
    value:3,
  },
  {  
    label:'已完成',
    value:4,
  },
  {  
    label:'状态异常',
    value:5,
  },
  {  
    label:'已删除',
    value:6,
  },
]
 const typeOptions = [
  {  
    label:'易优',
    value:'1',
  },
  {  
    label:'非易优',
    value:'2',
  },
]

const artcleStateOptions = [
  {  
    label:'已生成',
    value:'1',
  },
  {  
    label:'生成异常',
    value:'2',
  },
  {  
    label:'写入异常',
    value:'3',
  },
]

const artcleUpfileOptions = [
  {  
    label:'未上传',
    value:'0',
  },
  {  
    label:'上传成功',
    value:'1',
  },
  {  
    label:'上传失败',
    value:'2',
  },
]

const image_typeOptions = [
  {  
    label:'png',
    value:'1',
  },
  {  
    label:'jpg',
    value:'2',
  },
  {  
    label:'jpeg',
    value:'3',
  },
  {  
    label:'gif',
    value:'4',
  },
]


export  {stateOptions, typeOptions, artcleStateOptions,artcleUpfileOptions, image_typeOptions}
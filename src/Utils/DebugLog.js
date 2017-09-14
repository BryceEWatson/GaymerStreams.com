var DEBUG = process.env.NODE_ENV !== 'production';

function DebugLog(msg, param){
  if (!DEBUG) return;

  console.log(msg, param);
}

export default DebugLog;

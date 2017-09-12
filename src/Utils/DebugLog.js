var DEBUG = 0;

function DebugLog(msg, param){
  if (!DEBUG) return;

  console.log(msg, param);
}

export default DebugLog;

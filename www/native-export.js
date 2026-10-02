(function(){
  var b=document.getElementById('btn-export'); if(!b) return;
  b.onclick=async function(){
    var raw=localStorage.getItem('ironlog_data_v1')||'{}', data=raw;
    try{data=JSON.stringify(JSON.parse(raw),null,2)}catch(e){}
    var name='ironlog-backup-'+new Date().toISOString().slice(0,10)+'.json', C=window.Capacitor;
    try{
      if(C&&C.isNativePlatform&&C.isNativePlatform()){
        var r=await C.Plugins.Filesystem.writeFile({path:name,data:data,directory:'CACHE',encoding:'utf8'});
        await C.Plugins.Share.share({title:'Iron Log backup',url:r.uri});
      }else{
        var u=URL.createObjectURL(new Blob([data],{type:'application/json'})),a=document.createElement('a');
        a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(u);
      }
    }catch(e){alert('Backup failed: '+(e&&e.message||e))}
  };
})();

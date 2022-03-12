import {data, storage} from "../firebase";
import publicIP from 'react-native-public-ip';
import axios from "axios";

const getHistory = (idn) =>{
    return new Promise((resolve, reject)=>{
        data.ref('transaction').orderByChild('userid').equalTo(idn).once('value', (snapshot)=>{
            let s = [];
            snapshot.forEach((snap)=>{
                s.push([snap.key, snap.val()]);
            });
            resolve(s);
        });
    });
}

{/* ACCOUNT PROFILE PICTURE */}
const deletePROFPIC = (idn) =>{
    return new Promise(function (resolve, reject) {
            let ref = storage.ref(`profilepics/${idn}`);
            
            ref.listAll().then(dir => {
            dir.items.forEach(fileRef => {
                var dirRef = storage.ref(fileRef.fullPath);
                dirRef.getDownloadURL().then(function(url) {
                var imgRef = storage.refFromURL(url);
                imgRef.delete().then(function() {
                    resolve(true);
                }).catch(function(error) {  
                    console.log(error);
                    resolve(true);  
                });
                });
            });
            }).catch(error => {
                console.log(error);
                resolve(true);
            });
            resolve(true);
    });
}

const addImage = (idn, image) =>{
    return new Promise((resolve, reject) => {
        const uploadTask = storage.ref(`profilepics`).child(idn).child(image.name).put(image);
        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {
            console.log(error);
          },
          () => {
            storage
            .ref(`profilepics/${idn}`)
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                resolve(url);
            });
          }
        );
    });
   
}

{/* ACCOUNT USER INFORMATIONS */}
const updateACCOUNT = (idn, set) =>{
    return new Promise((resolve, reject) => {
        data.ref("accounts").child(idn).update(set).then((d)=>{
            resolve(true);
        });
      
    });

  }

const addAddress = (id, val) =>{
    return new Promise((resolve, reject)=>{
        data.ref("accounts").child(id).child("addresses").push(val).then(()=>{
            resolve(true);
        });
    });
}

const removeAddress = (id, id2) =>{
    data.ref("accounts").child(id).child("addresses").child(id2).remove();
}

const setPrimaryAddress = (id, id2, id3)=>{
    data.ref("accounts").child(id).child("addresses").child(id2).update({primary: false}).then(()=>{
        data.ref("accounts").child(id).child("addresses").child(id3).update({primary: true});
    });
}

const addLogs = (page) =>{
    publicIP()
    .then(ip => {
      saveLogs(ip, page);
    }).catch(error => {
        saveLogs("unknown", page);
    });
}

const getAccountDetails = (idn) =>{
    return new Promise((resolve, reject)=>{
        data.ref('accounts').orderByKey().equalTo(idn).once('value', (snapshot)=>{
            try{
                if(snapshot.val()===null){
                    resolve(false);
                }else{
                   snapshot.forEach((d)=>{
                       resolve(d.val());
                   });
                }
            }catch(e){
                resolve(false);
            }
            
        });
    });
}

const checkPasswordIfCorrect = (idn, pass) =>{
    return new Promise((resolve, reject) =>{
        data.ref("accounts").child(idn).once("value", (snapshot) =>{
            resolve(snapshot.val().password === pass);
        });
    });

}

  {/* ORDER TRANSACTIONS */}
  const cancelorder = (hid, reason)=>{
    return new Promise((resolve, reject)=>{
        data.ref('transaction').child(hid).update({status: 'Cancelled', reason: reason}).then((d)=>{
            data.ref('transaction').child(hid).once('value', (snapshot)=>{
                snapshot.val().items.forEach((d)=>{
                    data.ref('products').child(d[1].key).once('value', (snaps)=>{
                        if(snapshot.val()!==null){
                            data.ref('products').child(d[1].key).update({numberofitems: snaps.val().numberofitems+d[1].amount, totalsold: snaps.val().totalsold-d[1].amount});
                        }
                    });
                });
                resolve(true);
            });
        });
    })
}
const cancelorderR = (hid, reason)=>{
    return new Promise((resolve, reject)=>{
        data.ref('reservation').child(hid).update({status: 'Cancelled' , reason: reason}).then((d)=>{
            resolve(true);
        });
    });
}

const NumberFormat = (n) =>{
    try{
      let g = n.toString().split(".");
      let x = g[0].split("");
        x=x.reverse();
        if(x.length>3){
            for(let i=3; i<x.length; i+=4){
                x.splice(i, 0, ",");
            }
        }
        x.reverse();
       return(g.length===2?x.join("")+"."+g[1]:x.join(""));
      }catch{
        return("0");
      }
  }

  const getAdvanceOrder = (id) =>{
    return new Promise((resolve, reject)=>{
       data.ref('reservation').orderByChild('userid').equalTo(id).once('value', (snapshot)=>{
       let o = [];
       snapshot.forEach((data)=>{
           o.push([data.key,data.val()]);
       });            
       resolve(o);
     })
   });
 }
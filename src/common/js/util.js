/*
	1.获取id函数
	2. 拿到字符串？id=？？？？
	3.返回object｛id:123123｝
 */
export function urlParse(){
	let url=window.location.search;
	let obj = {};
	let reg =/[?&][^?&]+=[^?&]+/g;
	let arr =url.match(reg);
	//匹配到的['?id=123','&a=b']
	if(arr){
		arr.forEach((item)=>{
			let tempArr = item.substring(1).split('=');
			let key = decodeURIComponent(tempArr[0]);
			let val = decodeURIComponent(tempArr[1]);
			obj[key]=val;
		});
	}
		return obj;
}
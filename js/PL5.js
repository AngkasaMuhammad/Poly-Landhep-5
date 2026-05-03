'use strict'



import {
	lihat as lih,
} from './utilku.js'

let valtype = val=>{
    if (val === null) {
        return 'null'; // Special case: typeof null is "object", so handle it explicitly.
    }
    if (Array.isArray(val)) {
        return 'array'; // Arrays are technically objects, but we want to distinguish them.
    }
    const type = typeof val;
    if (type === 'object') {
        return 'object'; // Handle plain objects.
    }
    return type; // Return the type for primitives like 'number', 'string', 'boolean', etc.
}

class Deferred {
	constructor() {
		this.promise = new Promise(resolve => {
			this.run = resolve;
		});
	}

	// Make the instance awaitable: await d	=== await d.promise
	then(...args) { return this.promise.then(...args); }
	catch(...args) { return this.promise.catch(...args); }
	finally(...args) { return this.promise.finally(...args); }
}

const taskQueue = []; //wasm asyncs

let enta = async (fn, ...args)=>{ //enqueue task
	let defe = new Deferred()
	taskQueue.push([fn,args,defe,]);
	return defe
}

let runWAsmQueue = async()=>{
	while (taskQueue.length) {
		const [fn,args,defe,] = taskQueue.shift();
		defe.run(await fn(...args)); // ensures order
	}
}

let submitarr = []
let submitdone = null



let wasm_cce = async ( //createCommandEncoder
	encoreso,
)=>{
	let ce = await reso.get(encoreso)
	ce = dv.createCommandEncoder(ce.descriptor)
	return editenco = ce
}

let wasm_submit = async (
)=>{
	await submitdone
	await runWAsmQueue()
	dv.queue.submit(submitarr)
	submitarr = []
	return submitdone = dv.queue.onSubmittedWorkDone()
}


let editenco = 'kkkkosong'



let wasm_brp = async ( //beginRenderPass
	strrpreso,
)=>{
	let rpreso = await reso.get(strrpreso)
	let descr = rpreso.descriptor
	
	for(let ca of descr.colorAttachments){
		if(ca.view.label === cvd.label){
			ca.view = cx3d.getCurrentTexture().createView(cvd) //context
		}
	}
	
	let rp = editenco.beginRenderPass(descr)
	//lih(rp)
	return editrp = rp
}


let wasm_cttt = async ( //finish
	src,
	dst,
	size,
)=>{
	await 99999
	
	src = tex.has(src) ?tex.get(src)() :(await reso.get(src))
	dst = tex.has(dst) ?tex.get(dst)() :(await reso.get(dst))
	if(
		src.width !== dst.width ||
		src.height !== dst.height
	) throw Error('size must match')
	
	editenco.copyTextureToTexture(
		{texture:src},
		{texture:dst},
		src,
	)
}


let wasm_finish = async ( //finish
)=>{
	await 99999
	submitarr.push(editenco.finish({label:editenco.label+' --> finishhhhhh'}))
	editenco = 'kkkkosong1'
}



let editrp = 'kosonggg g gg'



let wasm_sp = async ( //setPipeline
	strpipereso
)=>{
	let pipe = await reso.get(strpipereso)
	editrp.setPipeline(pipe)
}


let wasm_svb = async ( //setVertexBuffer
	slot,
	strbufreso,
	offset,
	size,
)=>{
	let buf = await reso.get(strbufreso)
	if(size < 0){
		editrp.setVertexBuffer(slot,buf,offset,)
	}else{
		editrp.setVertexBuffer(slot,buf,offset,size,)
	}
}


let wasm_sib = async ( //setIndexBuffer
	strbufreso,
	indexFormat,
	offset,
	size,
)=>{
	let buf = await reso.get(strbufreso)
	if(size < 0){
		editrp.setIndexBuffer(buf,indexFormat,offset,)
	}else{
		editrp.setIndexBuffer(buf,indexFormat,offset,size,)
	}
}


let wasm_sbg = async ( //setBindGroup
	index,
	strbgreso,
)=>{
	let bg = await reso.get(strbgreso)
	editrp.setBindGroup(index,bg,)
}


let wasm_dii = async ( //drawIndexedIndirect
	strbufreso,
	offset,
)=>{
	let buf = await reso.get(strbufreso)
	editrp.drawIndexedIndirect(buf,offset,)
}


let wasm_di = async ( //drawIndirect
	strbufreso,
	offset,
)=>{
	let buf = await reso.get(strbufreso)
	editrp.drawIndirect?.(buf,offset,) //sampe sini
}


let wasm_draw = async ( //draw
	vertexCount,
	instanceCount,
	firstVertex,
	firstInstance,
)=>{
	//await 0 //nilai sembarang
	editrp.draw(
		vertexCount,
		instanceCount,
		firstVertex,
		firstInstance,
	)
}


let wasm_end = async ( //end
)=>{
	//await 0 //nilai sembarang
	editrp.end()
	editrp = 'bekas '+editrp.label
}


/*========
let wasm_ = async ( //
)=>{
	let = await reso.get()
	editrp.()
}
--------*/


//audio sekali play
let wasm_fxauplay = async straucon=>{
	let aucon = await reso.get(straucon)
	let out = []
	for(let con of aucon){
		let bufsrc = con.buf //con.src
		let when = +con.start
		let whenglo = when +aucx.currentTime
		let vol = +con.volume
		let buftrimstart = +con.buftrimstart
		let buftrimend = con.buftrimend
			buftrimend = (buftrimend === 'src') ?bufsrc.duration :+buftrimend
		let dur = con.bufduration
			dur = (dur === 'trimmed') ?(buftrimend-buftrimstart) :dur //buffer time
			dur = (dur === 'endless') ?'endless' :+dur //buffer time
		let bufscale = +con.bufscale
		
		let source = aucx.createBufferSource()
		source.buffer = bufsrc
		source.loop = true
		source.playbackRate.value = 1/bufscale;
		
		const gain_vol = aucx.createGain();
		const gainL = aucx.createGain();
		const gainR = aucx.createGain();
		gain_vol.gain.value = vol
		//source.connect(gain_vol).connect(aucx.destination)
		source.connect(gain_vol)
		gain_vol.connect(gainL).connect(LRmerger, 0, 0,)
		gain_vol.connect(gainR).connect(LRmerger, 0, 1,)
		
		out.push({
			src:source,
			gain_vol,
			gainL,
			gainR,
		})
		
		let curtime = aucx.currentTime
		let whencx = curtime +when
		
		source.loopStart = buftrimstart
		source.loopEnd = buftrimend
		let durcx = dur
		
		let offsetlok = buftrimstart
		
		source.start(whencx,offsetlok,)
		if(dur !== 'endless'){
			durcx *= bufscale
			source.stop(whencx+durcx)
			source.addEventListener('ended',e=>{
				gain_vol.disconnect()
				gainL.disconnect()
				gainR.disconnect()
			},)
		}
	}
	return out
}

let wasm_fxaustop = async aucon=>{
	for(let con of await aucon){
		con.src.stop()
		con.gain_vol.disconnect()
		con.gainL.disconnect()
		con.gainR.disconnect()
	}
}

let wasm_fxausetLR = (aucon,i,L,R,)=>{
	aucon[i].gainL.gain.value = L
	aucon[i].gainR.gain.value = R
}



//env audio
let wasm_envad = async strreso=>{ //set _aucon audio buffer
	suara.setAudioData(await reso.get(strreso))
}

//lainlain
let wasm_wb = async (
	buffer, //str
	bufferOffset, //number byte
	data, //str
	dataOffset, //number byte
	size, //number byte
)=>{
	buffer = await reso.get(buffer)
	data = (await reso.get(data)).buffer

	
	dv.queue.writeBuffer(
		buffer,
		bufferOffset,
		data,
		dataOffset,
		size,
	)
}

let wasm_getreso = str=>{
	return reso.get(str)
}

let wasm_rct = //resize canvas texture
//window.resize_canvas = 
async (w,h,)=>{
	canv3d.width = w
	canv3d.height = h
	
	for(let map0 of resizecanvarr){
	for(let [key, info] of map0.entries()){
		let gpuobj = 
			create_gpu_object
			.get(info.type)
			?.(info,key,)
		await gpuobj
		reso.set(key,gpuobj,)
	}
	}
}



let canv3d = null
let cx3d = null

let pl5 = null

let presentationFormat = navigator.gpu.getPreferredCanvasFormat()

let aucx = new AudioContext()
let LRmerger = aucx.createChannelMerger(2)
LRmerger.connect(aucx.destination)
let suara = null

let reso = new Map()
let tunggureso = new Deferred()

let resizecanvarr = [ //canvas size updates texture, texview, bind
	new Map(), //texture
	new Map(), //texture view
	new Map(), //bind
	new Map(), //render pass
]






/*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
sampe sini:




=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\*/






let resosrc = null
let loadreslinks = async (reslinkslink)=>{
	//+++++++++++++++ resource +++++++++++++++
	
	reslinkslink = new URL(reslinkslink,location.href,)
	resosrc = fetch(reslinkslink)
	.then(r=>r.text())
	
	//fetch links
	.then(str=>Promise.all(
		str
		.split(strnewline)
		.map(aa=>{
			let urlini = new URL(aa,reslinkslink,)
			return fetch(urlini)
			.then(r=>r.json())
			.then(out=>({
				out,
				parenturl:urlini,
			}))
		})
	))
	.then(arr=>{
		for(let {out,parenturl,} of arr){ for(let k in out){
			let o = out[k]
			o.parenturl = parenturl
		}}
		return Object.assign({},...arr.map(aa=>aa.out),)
	})
}






let wasmsrc = null
let loadwasmlinks = async (wasmlinkslink)=>{
	//+++++++++++++++ wasm +++++++++++++++
	
	wasmlinkslink = new URL(wasmlinkslink,location.href,)
	wasmsrc = fetch(wasmlinkslink)
	.then(r=>r.text())
	
	//fetch links
	.then(async str=>{
		let strconst = {
			builtins: ["js-string"], // Enable JavaScript string builtins
			importedStringConstants: "myStrings", // Enable imported global string constants
		}
		
		lih('tunggu reso')
		let impobj = {
		main:{
			getreso:wasm_getreso,
			rct:wasm_rct,
			lihat:lih,
			fxauplay:wasm_fxauplay,
			fxaustop:wasm_fxaustop,
			fxausetLR:wasm_fxausetLR,
			wb:wasm_wb,
			envad:wasm_envad,
			envauplay:()=>suara.play(),
			envaupause:()=>suara.pause(),
			envausetLR:(i,L,R,)=>suara.setLR(i,L,R,),
			envausetTime:t=>suara.setCurTime(t),
			envaugetTime:()=>suara.getCurTime(),
			envausetSpeed:s=>suara.setspeed(s),
			envaugetSpeed:()=>suara.getspeed(),
			envaucount:()=>suara.count(),
			
			
			
			
			cce:(...args)=>enta(wasm_cce, ...args),
				brp:(...args)=>enta(wasm_brp, ...args),
					sp:(...args)=>enta(wasm_sp, ...args),
					svb:(...args)=>enta(wasm_svb, ...args),
					sib:(...args)=>enta(wasm_sib, ...args),
					sbg:(...args)=>enta(wasm_sbg, ...args),
					draw:(...args)=>enta(wasm_draw, ...args),
					di:(...args)=>enta(wasm_di, ...args),
					dii:(...args)=>enta(wasm_dii, ...args),
					end:(...args)=>enta(wasm_end, ...args),
				//clear buffer blum bikin
				//copy buf to buf blum bikin
				cttt:(...args)=>enta(wasm_cttt, ...args),
				finish:(...args)=>enta(wasm_finish, ...args),
			submit:wasm_submit,
				
		},
		memory:(await tunggureso).memorydict,
		table:(await tunggureso).tabledict,
		global:(await tunggureso).globaldict,
		}
		lih('reso loaded')
		
		
		
		return Promise.all(
		str
		.split(strnewline)
		.map(aa=>{
			let urlini = new URL(aa,wasmlinkslink,)
			return WebAssembly.instantiateStreaming(
				fetch(urlini),
				impobj,
				strconst,
			)
		})
		
		
		
	)})
}



let dv = navigator.gpu.requestAdapter()
.then(adap=>adap.requestDevice({
	requiredFeatures: ['indirect-first-instance'], // Enable the feature here
}))



let cvd = {label:'canvas color view '+Math.random()}//canvas view descriptor

let strnewline = /\r\n|\r|\n/

let _aucon = class {
	#speed
	constructor() { //audioData
		let curtime = aucx.currentTime
		this.audioContext = aucx;
		this.audioData = []; //audioData;
		this.sources = [];
		this.gainpanNodes = [];
		this.isPlaying = false;
		this.#speed = 1;
		this.startTime = curtime;// global
		this.curtime = 0;// global, ga realtime
		this.lastseek = 0;// local
		this.stopTime = curtime;// global
		
		
	}

	#createSource(audioBuffer, volume, newspeed,gainpan,/*x,y,z,*/) {//loop,
		const source = this.audioContext.createBufferSource();
		source.buffer = audioBuffer;
		source.playbackRate.value = newspeed;
		source.loop = true
		
		gainpan.gain_vol.gain.value = volume

		source.connect(gainpan.gain_vol)

		return source;
	}

	start_at(seek,newspeed,) {
		if (this.isPlaying) return;
		this.isPlaying = true;
		
		let curtime = this.audioContext.currentTime
		
		this.audioData.forEach(({
			
			//src:bufsrc,
			buf:bufsrc,
			start:when,
			bufduration,
			volume,
			
			buftrimstart,
			buftrimend, // < 0, bufsrc.duration
			bufscale,
			
			//x,y,z,
			
		},i,) => {
			when *= 1
			volume *= 1
			
			buftrimstart *= 1
			buftrimend = (buftrimend === 'src') ?bufsrc.duration :+buftrimend
			
			bufduration = (bufduration === 'trimmed') ?(buftrimend-buftrimstart) :bufduration //buffer time
			bufduration = (bufduration === 'endless') ?'endless' :+bufduration //buffer time
			
			bufscale *= 1
			/*
			cara pakai start()
				when:contexttime,
				offset:sourcetime,
			*/
			
			const source = this.#createSource(
				bufsrc,
				volume,
				newspeed/bufscale,
				this.gainpanNodes[i],
				
				//x,y,z,
			)
			
			let whenglo = when
			let whencx = Math.max(0,curtime +(whenglo-seek)/newspeed,)
			
			source.loopStart = buftrimstart
			source.loopEnd = buftrimend //(buftrimend < 0)?bufsrc.duration:buftrimend
			let durcx = bufduration //(bufduration < 0)?bufsrc.duration:bufduration
			
			let offsetlok = Math.max(0,-whenglo+seek,)/bufscale
			offsetlok = offsetlok % (source.loopEnd-source.loopStart)
			offsetlok += buftrimstart
			
			source.start(whencx,offsetlok,) //parameter start() duration tidak jelas, ganti pake stop()
			if(bufduration !== 'endless'){
				durcx *= 1/newspeed*bufscale
				source.stop(whencx+durcx)
			}
			
			
			
			
			//
			this.sources.push(source);
			
		});
		//akhir
		this.#speed = newspeed
		this.startTime = curtime
		this.lastseek = seek

	}

	destroy() {
		if (!this.isPlaying) return
		this.curtime = this.getCurTime()
		this.isPlaying = false;
		this.stopTime = this.audioContext.currentTime
		this.sources.forEach((source) => {
			source.stop();
			source.disconnect();
		});
		this.sources = [];
	}
	
	//methods
	setAudioData(cont){
		this.audioData = cont
		for(let gainpan of this.gainpanNodes){
			gainpan.gain_vol.disconnect()
			gainpan.gainL.disconnect()
			gainpan.gainR.disconnect()
		}
		this.gainpanNodes = []
		for(let val of cont){
			
			let gain_vol = this.audioContext.createGain()
			let gainL = this.audioContext.createGain()
			let gainR = this.audioContext.createGain()
			
			gain_vol.connect(gainL).connect(LRmerger, 0, 0,)
			gain_vol.connect(gainR).connect(LRmerger, 0, 1,)
			
			
			this.gainpanNodes.push({
				gain_vol,
				gainL,
				gainR,
			})
		}
		if(this.isPlaying){
			this.destroy()
			this.start_at(this.curtime,this.#speed,)
		}
	}
	play(){
		//"this.curtime" beda dengan "curtime"
		this.start_at(this.curtime,this.#speed,)
	}
	pause(){
		this.destroy()
	}
	setCurTime(time){
		time = Math.max(0,time,)
		if(this.isPlaying){
			this.destroy()
			this.start_at(time,this.#speed,)
		}else{
			this.curtime = time
		}
	}
	setspeed(speed){
		speed = Math.max(0,speed,)
		if(this.isPlaying){
			this.destroy()
			this.start_at(this.curtime,speed,)
		}else{
			this.#speed = speed
		}
	}
/*========
	setpos(i,x,y,z,w,){ // i -->> index cont
		
		x *= w
		y *= w
		z *= w
		let gainR = this.gainpanNodes[i].gainR
		let gainL = this.gainpanNodes[i].gainL
		gainL.gain.value = 1/(distSq3(x,y,z,-1,0,0,)+1)
		gainR.gain.value = 1/(distSq3(x,y,z,1,0,0,)+1)
	}
	getinitpos(i){ // i -->> index cont
		let cont = this.audioData[i]
		return [cont.x,cont.y,cont.z,cont.r,]
	}
--------*/
	setLR(i,L,R,){ // volume L & R
		let gainLR =  this.gainpanNodes[i]
		gainLR.gainL.gain.value = L
		gainLR.gainR.gain.value = R
	}
	
	getCurTime() {//realtime
		let curtime = this.audioContext.currentTime
		return this.isPlaying
		? (
			(this.isPlaying ? curtime : this.stopTime)
			- this.startTime
		)*this.#speed + this.lastseek
		: this.curtime
	}
	getspeed(){
		return this.#speed
	}
	count(){
		return this.audioData.length
	}
};

suara = new _aucon()

const tsvToObj = (tsv, key = null) => {
	const [header, ...rows] =
		tsv.trim()
			.split(strnewline)
			.map(r => r.split('\t'));

	if (key === null) {
		// Return an array of objects
		return rows.map(row =>
			Object.fromEntries(
				header.map((col, i) => [col, row[i]])
			)
		);
	} else {
		// Return an object keyed by the given column name
		const keyIndex = header.indexOf(key);
		if (keyIndex === -1)
			throw new Error(`Key "${key}" not found in header`);

		return rows.reduce((out, row) => {
			out[row[keyIndex]] = Object.fromEntries(
				header
					.map((col, i) => [col, row[i]])
					.filter(([col]) => col !== key)
			);
			return out;
		}, {});
	}
};

let distSq3 = (
	x0,y0,z0,
	x1,y1,z1,
)=>{
	const dx = x1 - x0;
	const dy = y1 - y0;
	const dz = z1 - z0;
	return dx * dx + dy * dy + dz * dz;
}

// https://chatgpt.com/c/6997be37-6ee8-8321-b99a-0c816d277bfa

let fstost = (buffer, offset, nobj, layout,) => { //storage_struct

	const align16 = v => (v + 15) & ~15

	const typeInfo = {
		'mat4x4f': { size: 64, ArrayType: Float32Array, length: 16 },
		'vec4f':   { size: 16, ArrayType: Float32Array, length: 4  },
		'vec3f':   { size: 16, ArrayType: Float32Array, length: 3  }, // padded to 16
		'vec2f':   { size: 8,  ArrayType: Float32Array, length: 2  },
		'f32':	 { size: 4,  ArrayType: Float32Array, length: 1  },
		'u32':	 { size: 4,  ArrayType: Uint32Array,  length: 1  },
		'i32':	 { size: 4,  ArrayType: Int32Array,   length: 1  },
	}

	// compute per-instance layout
	let fields = []
	let stride = 0

	for (let key in layout) {
		const info = typeInfo[layout[key]]
		if (!info) throw new Error('unknown type: ' + layout[key])

		stride = align16(stride)
		fields.push({
			key,
			offset: stride,
			...info
		})
		stride += info.size
	}

	stride = align16(stride) // final struct alignment

	// build instances
	const out = new Array(nobj)

	for (let i = 0; i < nobj; i++) {

		const base = offset + i * stride
		const inst = {}

		for (let f of fields) {
			inst[f.key] = new f.ArrayType(
				buffer,
				base + f.offset,
				f.length
			)
		}

		out[i] = inst
	}

	return out
}

let create_gpu_object = new Map()

create_gpu_object.set(
'storage_struct',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
	return fstost(
		(await reso.get(descr.array)).buffer,
		descr.offset,
		descr.length,
		descr.layout,
	)
},)

create_gpu_object.set(
'object',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
	return data
},)

create_gpu_object.set(
'typed_array',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
	let out = new window[descr.array_type](
		(await reso.get(data)).buffer,
		descr.byte_offset,
		descr.length,
	)
	
	return out
},)

create_gpu_object.set(
'wasm_global',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
	let g = new WebAssembly.Global({
		value:descr.globaltype,
		mutable:descr.mutable,
	},data,)
	
	return g //samoe sini
},)

create_gpu_object.set(
'wat_table',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
	let t = new WebAssembly.Table({
		initial: descr.initial,
		element: descr.element,
	})
	
	return t
},)

create_gpu_object.set(
'wasm_memory',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
				//fgoi(key,'LOAD\t\t'+key,)
	let arrbuf = await fetch(new URL(data,parenturl,))
	arrbuf = await arrbuf.arrayBuffer()
				//fgoi(key,'DONE '+key,)
	let pages = Math.max(Math.ceil(arrbuf.byteLength / 65536),1,)
	let mem = new WebAssembly.Memory({ initial: pages });
	new Uint8Array(mem.buffer)
	.set(new Uint8Array(arrbuf), 0,)
	
	return mem
},)

create_gpu_object.set(
'gpu_buffer',async ({
	type,
	descriptor:descr, //d_
	data, //da_
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
	//let d_obj
	let d_key = (valtype(descr) === 'string') && (reso.get(descr) !== undefined)
	let d_link = (valtype(descr) === 'string') && (reso.get(descr) === undefined)
	//let da_null
	let da_link = data !== null
	
				//fgoi(key,'LOAD\t\t'+key,)
	d_key && (descr = await reso.get(descr))
	d_link && (descr = fetch(new URL(descr,parenturl,)))
	d_link && (descr = (await descr).json())
	da_link && (data = fetch(new URL(data,parenturl,)))
	da_link && (data = (await data).arrayBuffer())
				//fgoi(key,'DONE '+key,)
	
	let buf = dv.createBuffer(await descr)
	da_link && dv.queue.writeBuffer(buf,0,await data,)
	return buf
},)

create_gpu_object.set(
'gpu_texture',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
	let info = {
		type,
		descriptor:descr,
		data,
		parenturl,
	}
	descr = structuredClone(descr)
	
	let ibm = null //image bitmap
	if(data !== null){
		let img = document.createElement("img")
		img.crossOrigin = "anonymous" // Enable CORS
		img.src = new URL(data,parenturl,).toString()
				//fgoi(key,'LOAD\t\t'+key,)
		await img.decode()
		ibm = await createImageBitmap(img)
				//fgoi(key,'DONE '+key,)
		
	}
	
	if(pf.has(descr.format)){
		descr.format = pf.get(descr.format)
	}
	if(texsize.has(descr.size)){
		descr.size = await texsize.get(descr.size)(ibm,key,info,)
	}
	
	let texini = dv.createTexture(descr)
	
	if(data !== null){	
		dv.queue.copyExternalImageToTexture(
			{ source: ibm},
			{ texture: texini},
			[ibm.width, ibm.height],
		)
	}
	
	return texini
},)



let texsize = new Map()//texture size
texsize.set(
	'(canvas)',
	async (ibm,key,info,)=>{ //ambil width & height doang
		if(resizecanvarr[0].has(key)){
			;(await reso.get(key)).destroy()
		}else{
			resizecanvarr[0].set(key,info,)
		}
		return canv3d
	},
)
texsize.set(
	'(image_data)',
	(ibm,key,info,)=>[ibm.width,ibm.height,], //ambil width & height doang
)


let tex = new Map()//texture
tex.set(
	'(context)',
	()=>cx3d.getCurrentTexture(), //context
)

create_gpu_object.set(
'gpu_texture_view',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
	let info = {
		type,
		descriptor:descr,
		data,
		parenturl,
	}
	descr = structuredClone(descr)
	
	if(
		!resizecanvarr[1].has(key) &&
		resizecanvarr[0].has(data)
	){
		resizecanvarr[1].set(key,info,)
	}
	
	let texini = await reso.get(data)
	let view = texini.createView(descr)
	return view
},)



let texview = new Map()//texture view
texview.set(
	'(context)',
	()=>cx3d.getCurrentTexture().createView(cvd), //context
)

create_gpu_object.set(
'gpu_sampler',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
	return dv.createSampler(descr)
},)

create_gpu_object.set(
'audio_buffer_list',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	//let wait = new Deferred()
	//aubuflist.push(wait)
	
	await 0 //lih(type)
	await 0 //lih(type)
	
				//fgoi(key,'LOAD\t\t'+key,)
	let arr = await fetch(new URL(data,parenturl,))
	arr = await arr.text()
	
	let out = tsvToObj(arr,'key',)
	
	//request, link
	for(let a in out){
		let b = out[a]
		let f0 = await fetch(new URL(b.data,parenturl,));
		b.data = f0.arrayBuffer();
	}
				//fgoi(key,'DONE '+key,)
	
	//tunggu buffer
	for(let a in out){
		let b = out[a]
		let arrayBuffer = await b.data
		b.data = aucx.decodeAudioData(arrayBuffer);
	}
	//wait.run(out)
	return out
},)

create_gpu_object.set(
'audio_controller',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	//let wait = new Deferred()
	//descr.backsound && cont.set(key,wait,) //cont.push(wait)
	
	await 0 //lih(type)
	await 0 //lih(type)
	
				//fgoi(key,'LOAD\t\t'+key,)
	let obj = await fetch(new URL(data,parenturl,))
	obj = await obj.text()
				//fgoi(key,'DONE '+key,)
	obj = tsvToObj(obj,null,)
	//auconlist.push(obj)
	
	//ambil data dari audio_buffer_list
	for(let con of obj){
		let buf = await reso.get(con.src)
		buf = await buf[con.subsrc]
		con.buf = await buf.data
	}
	
	//wait.run(obj)
	return obj
},)

create_gpu_object.set(
'gpu_pipeline_layout',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
	let bglarr = descr.bindGroupLayouts
	bglarr.forEach(async (bgl,i,arr,)=>arr[i] = await reso.get(bgl))
	await Promise.all(bglarr)
	
	return dv.createPipelineLayout(descr)
},)

create_gpu_object.set(
'gpu_render_pipe',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
//layout
	let aa = descr.layout
	descr.layout = await reso.get(descr.layout)
	
//fragment module
	descr.fragment.module =
	await reso
	.get(descr.fragment.module)
	
//vertex module
	descr.vertex.module =
	await reso
	.get(descr.vertex.module)
	
//format
	for(let target of descr.fragment.targets){
		if(pf.has(target.format)){
			target.format = pf.get(target.format)
		}
	}
	
//buffer
				//fgoi(key,'LOAD\t\t'+key,)
	descr.vertex.buffers = await Promise.all(
		descr.vertex.buffers
		.map(str=>
			(valtype(str) === 'string')
			?
			fetch(new URL(str,parenturl,))
			.then(res=>res.json())
			:
			str
		)
	)
				//fgoi(key,'DONE '+key,)
	
	
	return await dv.createRenderPipelineAsync(descr)
},)



let pf = new Map() //pipe format
pf.set(
	'(preferred_canvas_format)',
	navigator.gpu.getPreferredCanvasFormat(),
)

create_gpu_object.set(
'gpu_shader_module',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
	descr.code = fetch(new URL(descr.code,parenturl,))
				//fgoi(key,'LOAD\t\t'+key,)
	descr.code = (await descr.code).text()
	descr.code = await descr.code
				//fgoi(key,'DONE '+key,)
	return dv.createShaderModule(descr)
},)

create_gpu_object.set(
'gpu_buffer_binding',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
	
	descr.buffer = await reso.get(descr.buffer)
	
	return descr
},)

create_gpu_object.set(
'gpu_bind_group_layout',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
	return dv.createBindGroupLayout(descr)
},)

create_gpu_object.set(
'gpu_bind_group',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
	let info = {
		type,
		descriptor:descr,
		data,
		parenturl,
	}
	descr = structuredClone(descr)
	
	for(let entry of descr.entries){
//resizecanvarr
		if(
			!resizecanvarr[2].has(key) &&
			resizecanvarr[1].has(entry.resource)
		){
			resizecanvarr[2].set(key,info,)
		}
//-+-+-+-+-+-+-+-
		entry.resource = await reso.get(entry.resource)
	}
	descr.layout = await reso.get(descr.layout)
	
	return dv.createBindGroup(descr)
},)

create_gpu_object.set(
'gpu_command_encoder',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
		for(let k_encometh in data){
			let encometh = data[k_encometh] = await reso.get(data[k_encometh])
		}
	
	let o = {
		descriptor:descr,
		data,
	}
	return o
},)

create_gpu_object.set(
'gpu_begin_render_pass',async (
/*========
{
	type,
	descriptor:descr,
	data,
	parenturl,
}
--------*/
	encometh,
	key,
)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
			
	let info = {
		type:encometh.type,
		descriptor:structuredClone(encometh.descriptor),
		data:encometh.data,
		parenturl:encometh.parenturl,
	}
	
	for(let ca of info.descriptor.colorAttachments){
		let strcaview = ca.view
		ca.view = texview.has(ca.view)
		?texview.get(ca.view)()
		:await reso.get(ca.view)
//resizecanvarr
		if(
			!resizecanvarr[3].has(key) &&
			resizecanvarr[1].has(strcaview)
		){
			resizecanvarr[3].set(key,encometh,)
		}
//-+-+-+-+-+-+-+-
	}
	let dsa = info.descriptor.depthStencilAttachment
	let strdsaview = dsa.view
	dsa.view = await reso.get(dsa.view)
//resizecanvarr
	if(
		!resizecanvarr[3].has(key) &&
		resizecanvarr[1].has(strdsaview)
	){
		resizecanvarr[3].set(key,encometh,)
	}
//-+-+-+-+-+-+-+-
	
	//lih(`${key} ${texini.width} ${texini.height}`)
	return info
},)

create_gpu_object.set(
'gpu_clear_buffer',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
	data[0] = await reso.get(data[0])
	
	return {
		type,
		descriptor:descr,
		data,
	}
},)

create_gpu_object.set(
'gpu_copy_buffer_to_buffer',async ({
	type,
	descriptor:descr,
	data,
	parenturl,
},key,)=>{
	//dulu resosrclink, sekarang parenturl
	
	await 0 //lih(type)
	await 0 //lih(type)
	
	let i = (5 <= data.length)?2:1
	data[0] = await reso.get(data[0])
	data[i] = await reso.get(data[i])
	
	return {
		type,
		descriptor:descr,
		data,
	}
},)

let main_is_called = false
export let main = async (
	canv3d_param,
	cx3d_param,
	reslinks,
	wasmlinks,
)=>{
	if(main_is_called){
		return 'Already called'
	}
	main_is_called = true
	

	canv3d = canv3d_param
	cx3d = cx3d_param
	
loadreslinks(reslinks)
loadwasmlinks(wasmlinks)

resosrc = await resosrc
dv = await dv

cx3d.configure({ //context
	device:dv,
	format: presentationFormat,
	usage:
		GPUTextureUsage.RENDER_ATTACHMENT |
		GPUTextureUsage.COPY_DST
	,
});

//lih(resosrc)
for(let key in resosrc){
	let info = resosrc[key]
	reso.set(key,
		create_gpu_object
		.get(info.type)
		?.(info,key,),
	)
}

let memorydict = {};
let tabledict = {};
let globaldict = {};

for (let [k,v,] of reso) {
	v = await v
	if (v instanceof WebAssembly.Memory) memorydict[k] = v
	else if (v instanceof WebAssembly.Table) tabledict[k] = v
	else if (v instanceof WebAssembly.Global) globaldict[k] = v
}

tunggureso.run({
	memorydict,
	tabledict,
	globaldict,
})
wasmsrc = await Promise.all(await wasmsrc)

/*========
let draw = async ()=>{
	submitarr = []
	
	//encoarr = []
	let wasmwait = []
	for(let wasm of wasmsrc){
		wasmwait.push(wasm.instance.exports.main?.())
	}
	await Promise.all(wasmwait)
	await runWAsmQueue()
	
	dv.queue.submit(submitarr)
	return dv.queue.onSubmittedWorkDone()
}
--------*/


/*











*/

	return pl5 = {
		resosrc:reso,
		wasmsrc,
	}
}

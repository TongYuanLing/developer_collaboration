import Edgejson from '../../public/pull_requests.json';
import Nodejson from '../../public/contributors.json';
import { db } from './db';

export async function write(){
    try {
        await db.nodes.bulkAdd(Nodejson);   // 返回主键数组
        console.log('✅ 写入完成，共', Nodejson.length, '条');
        await db.edges.bulkAdd(Edgejson);   // 返回主键数组
        console.log('✅ 写入完成，共', Edgejson.length, '条');
    }catch(error){
        console.error(error);
    }
}
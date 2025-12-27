import { db, type Pr, type Contributor } from './db';

export async function createLine() {
    let node: Contributor[] = [];
    try {
        const data = await db.nodes.toArray();
        // console.log(data);
        node = data;
        console.log(node);
    } catch (readError) {
        // 文件读取异常处理（如文件不存在、权限问题等）
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.error(readError.message);
        // 可选：记录日志、返回 null 或抛出原始错误
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw new Error(readError.message);
    }
    let edge: Pr[] = [];
    try {
        const data = await db.edges.toArray();
        // console.log(data);
        edge = data;
        console.log(edge);
    } catch (readError) {
        // 文件读取异常处理（如文件不存在、权限问题等）
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.error(readError.message);
        // 可选：记录日志、返回 null 或抛出原始错误
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw new Error(readError.message);
    }
    return {
        nodes: node.map((contributor) => ({
                id: contributor.user_id,
                data: { ...contributor },
                style: {
                    src: contributor.avatar_url,
                    size: 50,
                }
            })
        ),
        edges: edge
            .filter(pr => db.nodes.where('user_id').anyOf(pr.creator_id).toArray() == undefined)
            .map(pr => ({
                source: pr.creator_id,
                target: pr.creator_id
            })
        )
    }
}
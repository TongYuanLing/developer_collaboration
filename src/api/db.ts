import Dexie from 'dexie';

export interface Pr {
    pr_number: number,
    title: string,
    state: string, //
    github_created_at: string,
    merged_at: string | null,
    creator_username: string,
    creator_id: number,
    merged_by_username: string | null,
    reviewers: string[],
    comments_count: number,
    reviews_count: number,
    additions: number,
    deletions: number,
    changed_files: number,
    html_url: string,
    cleaned_at: string
}
export interface Contributor{
    user_id: number,
    username: string,
    avatar_url: string,
    html_url: string,
    contributions: number,
    followers_url: string,
    repos_url: string,
    cleaned_at: string
}

class AppDB extends Dexie {
    edges!: Dexie.Table<Pr, number>;
    nodes!: Dexie.Table<Contributor, number>;

    constructor() {
        super('SimpleDB');
        this.version(1).stores({
            nodes: 'user_id, username', // 索引
            edges: 'pr_number, creator_id', // 索引
        });
    }
}

export const db = new AppDB();
export interface Media {
    id: string;
    title: string;
    type: 'Image'|'Video'|'ShortVideo';
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    createdAt: string;
    updatedAt: string;
    url: string;
  }
  
 export  interface Post {
    id: string;
    title: string;
    type: string;
    media: Media[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface MediaDocument {
    docs: Post[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null; 
    nextPage: number | null; 
  }
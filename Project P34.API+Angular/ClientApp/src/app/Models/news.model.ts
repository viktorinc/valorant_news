export class NewsModel {
    public Id: number;
    public Title: string;
    public Subtitle: string;
    public Text: string;
    public ImageUrl: string;
    public Likes: number;
  
    constructor() {
      this.Title = null;
      this.Text = null;
      this.Subtitle = null;
      this.ImageUrl = null;
      this.Likes = null;
    }
  
  }
  
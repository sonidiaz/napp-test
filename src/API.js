export class Api {
  constructor() {
    this.baseUrl = 'https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/';

  }
  async getList(page = 1){
      const response = await fetch(`${this.baseUrl}?page=${page}`)
      const data = await response.json();
      return data;
  }
  async getPost(id){
      const response = await fetch(`${this.baseUrl}${id}`)
      const data = await response.json();
      return data;
  }
}

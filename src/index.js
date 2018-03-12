
import moment from 'moment';
import {Api} from './API';
import {UI} from './UI';
import Navigo from '../node_modules/navigo';

var root = null;
var useHash = true;
var hash = '#!';
var router = new Navigo(root, useHash, hash);

const ApiRest = new Api();
const ui = new UI();

class App{
  constructor() {
    this.state = 'list';
    this.statePost = [];
    this.page = 1;
    this.temp = [];
    this.backSearch = false;
  }
  handleScroll = () => {
    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.body.clientHeight;

    if(!(scrolled + viewportHeight + 0 >= fullHeight)) {
      return null
    }
    console.log('scroll')
    this.page = this.page + 1;
    localStorage.setItem('page', this.page);
    this.backSearch = false;
    this.getListPost();

  }
  getListPost = (data, fromFetch = true) => {
    if(fromFetch){
        ApiRest.getList(this.page).
                  then(data => {
                      ui.listPosts(data);
                      if(!this.backSearch){
                        this.guardarPosts(data);

                      }
                  });
    }else{
      ui.listPosts(data, true);
    }
  }
  getPost = postID => {
    ApiRest.getPost(postID).
              then(data => {
                ui.singlePost(data);
                ui.cont_list.classList.add('active');
              });
  }

  handleClick = (e) => {
    let el = e.path[4].classList[0];
    if(el != 'btn-to-loomba'){
      return false;
    }else {
      let id = e.path[4].dataset.click;
      this.routerNavegate(id);
    }
  }

  backHome = (e) => {
    if(e.path[1].classList == 'brand'){
      router.navigate('/');
    }
  }
  getResults = data => {
      if(this.temp){
        const datos = this.temp;
        this.filterResult(datos, data);
      }
  }
  filterResult = (resultado, busqueda) => {
      const filtro = resultado.filter(
        filtro => {
          if(filtro.profession.indexOf(busqueda) !== -1){
              return filtro;
          }
          if(filtro.first_name.indexOf(busqueda) !== -1){
              return filtro;
          }
          if(filtro.last_name.indexOf(busqueda) !== -1){
              return filtro;
          }
        }
      );
      if(filtro.length){
        ui.listPosts(filtro, true);
        window.scrollTo(1200, 0);
      }
  }
  handleSearch = () => {
    if(ui.inputSearch.value.length){
        window.removeEventListener('scroll', this.handleScroll);
        let data = ui.inputSearch.value;
        this.getResults(data);
    }else if(ui.inputSearch.value.length == 0){
      this.backSearch = true;
      this.getListPost(this.temp, false);
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  guardarPosts = (posts) => {

    var arr = Object.keys(posts.results).map((key) =>  {
        this.temp.push(posts.results[key]);
        return posts.results[key];
      }
    );

    this.addPostlocalStorage(this.temp);

  }

  addPostlocalStorage = (post) => {
    let posts = [];
    localStorage.setItem('posts', JSON.stringify(post));
  }

  getPostlocalStorage = () => {
    let posts;
    if(localStorage.getItem('posts') === null){
      posts = [];
    }else{
      posts = JSON.parse(localStorage.getItem('posts'));
    }
    return posts;
  }
  router = id => {
    router
      .on({
        '/:id': (id) =>  {
          this.getPost(id.id);
        },
        '*': function () {
          ui.cont_list.classList.remove('active');
        }
      })
      .resolve();
  }
  routerNavegate = (id) => {
    router.navigate('/' + id);
  }
  init(){
      const secondDay = 86400;
      const dateinit = {
        "timeSecond": new Date().getTime()
      }

      const timeStorage = JSON.parse(localStorage.getItem('time'));

      const rango = (dateinit.timeSecond - timeStorage) / 1000;
      const __rango = Math.floor(rango);

      if(__rango > secondDay){
          localStorage.clear();
      }

      if(localStorage.getItem('time') === null){
          localStorage.setItem('time', JSON.stringify(dateinit.timeSecond));
          localStorage.setItem('page', 1);
          this.getListPost();

      }else{
        let posts = JSON.parse(localStorage.getItem('posts'));
        let _pageCache = parseInt(localStorage.getItem('page'));
        this.page = _pageCache;
        this.temp = posts;
        this.getListPost(posts, false);

      }

      this.router();
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('click', this.handleClick);
      window.addEventListener('click', this.backHome);

      ui.inputSearch.addEventListener('input', this.handleSearch);


  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
})


export class UI {
  constructor() {
    this.parent = document.getElementById('main-list-wrapper');
    this.cont_list = document.getElementById('main-post');
    this.inputSearch = document.querySelector('#search input');
    this.postID = 1;
  }

  listPosts = (data, nosearch = false) => {
    let post;
    if(!nosearch){
      post = data.results;
    }else{
      this.parent.innerHTML = '';
      post = data;
    }

    const cont_list = document.getElementById('main');

    post.map(data => {

      const gender = (data.gender == 'M') ? 'Man' : 'Woman';

      const div = document.createElement('div');
      div.classList.add('col-md-4');
      div.classList.add('cont-item-post');
      div.innerHTML = `<a href="javascript:void(0);" class="btn-to-loomba" data-click="${data.id}">
                        <div class="post list">
                          <div class="post-img">
                            <div class="cont-post-img">
                              <img src="${data.image}" alt="">
                            </div>
                          </div>
                          <hgroup>
                            <h3 class="first-name">${data.first_name} ${data.last_name}</h3>
                            <span class="gender">${gender}</span>
                            <h4 class="last-name">${data.profession} </h4>
                          </hgroup>
                        </div>
                      </a>`;

  
           this.parent.appendChild(div);

    })
  }
  singlePost = (post) => {
    let datapost = post;
    const gender = (post.gender == 'M') ? 'Man' : 'Woman';
    this.cont_list = document.getElementById('main-post');
    const contSingle = document.createElement('div');
    this.cont_list.innerHTML = '';

    contSingle.classList.add('container');
    this.cont_list.appendChild(contSingle);

    const $postItem = document.createElement('div');
    $postItem.classList.add('single');

    let desc = post.description;

    $postItem.innerHTML = `<div class="post single">
                        <div class="post-img">
                          <div class="cont-post-img">
                            <img src="${post.image}" alt="">
                          </div>
                        </div>
                        <hgroup>
                          <h3 class="first-name">${post.first_name} ${post.last_name}</h3>
                          <span class="gender">${gender}</span>
                          <h4 class="last-name">${post.profession} </h4>
                          <p class="description">
                              ${post.description}
                          </p>
                        </hgroup>
                      </div>`;
    contSingle.appendChild($postItem);

  }
}

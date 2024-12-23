const urlBase='https://jsonplaceholder.typicode.com/posts'
let posts=[]
function getData(){
    fetch(urlBase)
    .then(res => res.json())
    .then(data=>{
        posts=data
        renderPostList()
    })
    .catch(error=> console.error('ERROR', error))
    
}

function renderPostList(){
    const postList=document.getElementById('postList')
    postList.innerHTML='';

    posts.forEach(post => {
        const listItems= document.createElement('li');
        listItems.classList.add('postItem');
        listItems.innerHTML=`
        <strong>${post.title}</strong>
        <p>${post.body}</p>
        <button onclick="editPost(${post.id})">Editar</button>
        <button onclick="deletePost(${post.id})">Borrar</button>
        <div id="editForm-${post.id}" class="editForm" style="display:none">
            <label for="editTitle">Titulo: </label>
            <input type="text" id="editTitle-${post.id}" value="${post.title}" required>
            <label for="editBody">Comentario: </label>
            <textarea type="text" id="editBody-${post.id}" required> ${post.body}</textarea>
            <button onclick="updatePost(${post.id})">Actualizar</button>
        </div>
        `
        postList.appendChild(listItems)

    })
}


function postData(){
    const postTitleInput = document.getElementById('postTitle')
    const postBodyInput = document.getElementById('postBody')
    const postTitle = postTitleInput.value;
    const postBody = postBodyInput.value;
    if(postTitle.trim()==''|| postBody.trim()==''){
        alert('los campos son obligatorios')
        return
    }

    fetch(urlBase,{
        method:'POST',
        body: JSON.stringify({
            title: postTitle,
            body: postBody,
            userID:1,
        }),
        headers:{
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(res=> res.json())
    .then(data => {
        posts.push(data)
        renderPostList();
        postTitleInput.value='';
        postBodyInput.value='';
    })
    .catch(error=> console.error('ERROR', error))
}

function editPost(id){
    const editForm= document.getElementById(`editForm-${id}`)
    editForm.style.display=(editForm.style.display=='none')?'block':'none'
}
function updatepost(id){
    const editTitle= document.getElementById(`editTitle-${id}`).value
    const editBody= document.getElementById(`editBody-${id}`).value

    fetch(`${urlBase}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          title: editTitle,
          body: editBody,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },

    })
    .then(res=>res.json())
    .then(data=>{
        const index= posts.findIndex(post.id==data.id)
        if(index!=-1){
            post[index]=data
        }
        else{
            alert('error al actualizar la información del psoteo')
        }
        renderPostList()
    })
    .catch(error=> console.error('ERROR', error))

}

function deletePost(id){
    fetch(`${urlBase}/${id}`,{
        method:'DELETE',
    })
    .then(res=>{
        if(res.ok){
            posts=posts.filter(post=>post.id!=id)
            renderPostList()
        }
    })
    .catch(error=> console.error('ERROR', error))

}
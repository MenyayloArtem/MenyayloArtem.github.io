const Messanger = {
    data() {
      return {
          theme : localStorage.getItem('theme') || 'default',
          loadedImg : null,

          modal : {
              seen : false,
              option : null
          },

          message : {
              text : '',
              img : ''
          },

          selected : 'chats',
          blackoutContent: {},
          selectedItem : {},
          searchValue : "",
          user : {
              editSeen : false,
              avatarUrl : "avatars/7f9b7694df762d4a43e9a67760ba61af.jpg",
              nickname : "Артём",
              status : "Создатель проекта",
              email : 'example@email.com',
              permission : 'admin',
              friends : [
                  {
                    id : 1,
                    avatarUrl : "avatars/default.jpg",
                    nickname : "Другой пользователь",
                    status : 'Тестер',
                  },
                  {
                    id : 2,
                    avatarUrl : "avatars/default.jpg",
                    nickname : "Ещё кто-то",
                    status : 'Статус*',
                  }
                ],
              id : ''
          },

        newConv: {
            name : '',
            snbname : '',
            img : ''
        },

        chats : [
                {
                    avatarUrl : 'avatars/BwFyibsDUmc.jpg',
                    name : 'three friends',
                    description : 'Коммунисты',
                    messages : [],
                    members : [{
                        id : 0,
              avatarUrl : "avatars/7f9b7694df762d4a43e9a67760ba61af.jpg",
              nickname : "Артём",
              status : "Создатель проекта",
                    },{
                        id : 1,
                        avatarUrl : "avatars/default.jpg",
                        nickname : "Другой пользователь",
                        status : 'Тестер',
                    }]
                }
            ],

        searchedUser : null,
        loaded : null

      }
    },

    computed : {
        canInvite(){
            let friends = this.user.friends.slice(0)
            let members = this.selectedItem.members.map(item => item.id)
            friends = friends.filter(item => {
                return !members.includes(item.id)
            })
            return friends
        },

        editUserBuffer(){
            return {
                avatarUrl : this.user.avatarUrl,
                nickname : this.user.nickname,
                status : this.user.status
            }
        },
        visible(){
        let pattern = new RegExp(`${this.searchValue}`,'gi');
        let chats = this.chats.filter(item => item.name.match(pattern))
        let friends = this.user.friends.filter(item => item.nickname.match(pattern))
        return {chats,friends}
        }
    },

    methods : {
    
      sendMessage(){
            let message = {
                  avatarUrl : this.user.avatarUrl.split('/')[1],
                  sender : this.user.nickname,
                  senderId : this.user.id,
                  text : this.message.text.trim(),
                  room : this.selectedItem.id,
                  img : this.message.img
              }

        if(message.text && message.text.length < 30000){
            this.newMessage = ''
            this.selectedItem.messages.push(message)
            let messages = document.getElementById("messages")
            setTimeout(()=>{
            messages.scrollTo(0,messages.scrollHeight)
            },0)
        }
        this.message.text = ''
        this.message.img = ""
        document.getElementById('inputFile').value = ''
      },

      Save(){
        for(let key in this.editedUser){
            this.user[key] = this.editedUser[key]
            this.user.editSeen = false
        }
      },
      close(){
          this.modal.seen = false
      },
    setImg(data){
        this.message.img = data
    },
    uploadFile(id,to,mode){
          let file = document.getElementById(id).files[0]
          let reader = new FileReader()
          if(file){
            reader.onloadend =  () => {
            let result = reader.result
            switch(mode){
                case 'default' : {
                if(to){
                document.getElementById(to).src = result
                }
                }
                break;
                case 'save' : {
                    this.loaded = result
                }
                break;
                case 'msg' : {
                    this.setImg(result)
                }
                break;
                case 'get' : {
                return result
                }
            }
          }
            reader.readAsDataURL(file)
          } else {
              result = null
          }
          
      },

      select(chat){
        if(this.selectedItem){
            if(chat){
                this.selectedItem = chat
            }
        }
      },

      chooseTheme(theme){
        return function(){
            this.theme = theme
            document.getElementsByTagName('link')[1].href = `css/${theme}Theme.css`
            localStorage.setItem('theme',theme)
        }
      },

      newContact(){
        let form = document.getElementById('n')
        let fd = new FormData(form)
        this.uploadFile('editImg',null,'save')
          const contact = {
            name : fd.get('convName'),
            description : fd.get('convSubname'),
            messages : [],
            members : [{
                avatarUrl : "avatars/7f9b7694df762d4a43e9a67760ba61af.jpg",
                nickname : "Артём",
                status : "Создатель проекта",
            }]
        }
        const avatarUrl = document.getElementById('edit-img-preview').src
        contact.avatarUrl = avatarUrl
        if(!contact.avatarUrl){
            contact.avatarUrl = 'avatars/default.jpg'
        }
        if(!contact.description){
            contact.description = 'Участники (1/5)'
        }
        if(contact.name){
            this.chats.push(contact)
            this.close()
        } else {
            alert('Укажите имя беседы')
        }
      },

      invite(user,contactId){
        this.selectedItem.members.push(user)
      },

      chooseSetting(setting){
          if(setting == 'other'){
                this.blackoutContent = {
                title : 'Выбрать тему',
                items : [
                {name : 'Стандартная',action : this.chooseTheme('default')},
                {name : 'Темная',action : this.chooseTheme('dark')}
                ],
                images : false
                }
          }
        this.modal.option = setting
        this.modal.seen = true
      },

      editUser(){
        const avatarUrl = document.getElementById('edit-img-preview').src
        this.uploadFile('editImg',null,'save')
        Object.assign(this.user,this.editUserBuffer)
        this.user.avatarUrl = avatarUrl
        this.modal.seen = false
      },
    exit(){
        localStorage.setItem('follow','false')
        document.location.href = '/'
    },

    isFriend(id){
        return this.user.friends.allFriends.findIndex(item => item.id == id) >= 0
    },
    doFriend(user){
        this.user.friends.allFriends.push(user)
        this.searchedUser = null
    },
    },


    async mounted(){
    document.getElementsByTagName('link')[1].href = `css/${this.theme}Theme.css`
    this.select(this.chats[0])
        document.addEventListener('keydown',(e)=>{
            switch(e.code){
                case 'Escape' : {
                    this.modal.seen = false
                }
            }
        })
    }
  }

 Vue.createApp(Messanger).mount('#app')

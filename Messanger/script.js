const Messanger = {
    data() {
      return {
          theme : localStorage.getItem('theme') || 'default',
          loadedImg : null,
          modal : {
              seen : false,
              option : null
          },
          editMode : false,
          message : {
              text : '',
              imgSrc : ''
          },
          selected : 'chats',
          blackoutContent: {},
          selectedItem : {},
          searchValue : "",
          user : {
              editSeen : false,
              avatarUrl : "7f9b7694df762d4a43e9a67760ba61af.jpg",
              nickname : "Артём",
              status : "Автор проекта",
              email : 'example@email.com',
              permission : 'admin',
              id : ''
          },
          editedUser : {},
        newConv: {
            name : '',
            subname : '',
            img : ''
        },
        chats : {
            options : {
                active : true
            },
            allChats : [
                {
                    avatarUrl : 'BwFyibsDUmc.jpg',
                    name : 'three friends',
                    description : 'Коммунисты',
                    messages : []
                },
                {
                    avatarUrl : '1dcc3916e832a8a7ad5049ec42ef97bf.jpg',
                    name : 'Беседа 1',
                    description : 'Беседа',
                    messages : []
                }
            ],
            visibleChats : [

            ]
        },
        contacts : {
            options : {
                active : false
            },
           allContacts : [
            {
                avatarUrl : 'https://cm1.narvii.com/7113/9c1dbcec5765ef821fd3cda8e87f1f7173234739_00.jpg',
                name : 'Пользователь',
                lastMessage : 'Что-то',
                id : Math.random()
            }
           ],
           visibleContacts : [

           ]
      }
      }
    },
    computed : {
        edit(){
            return this.user
        }
    },
    methods : {
      sendMessage(){
            let message = {
                  avatarUrl : this.user.avatarUrl.split('/')[1],
                  sender : this.user.nickname,
                  senderId : this.user.id,
                  text : this.message.text.trim(),
                  imgSrc : this.message.imgSrc
              }

        if(message.text && message.text.length < 300){
            this.selectedItem.messages.push(message)
            let messages = document.getElementById("messages")
            setTimeout(()=>{
            messages.scrollTo(0,messages.scrollHeight)
            },0)
        }
        this.message.text = ''
        this.message.imgSrc = ""
        document.getElementById('inputFile').value = ''
      },
      Search(){
        let pattern = new RegExp(`${this.searchValue}`,'gi');
        this.chats.visibleChats = this.chats.allChats.filter(item => item.name.match(pattern))
        this.contacts.visibleContacts = this.contacts.allContacts.filter(item => item.name.match(pattern))
      },
      close(){
          this.modal = false
      },
      uploadFile(id,to,mode = 'default'){
          let file = document.getElementById(id).files[0]
          let reader = new FileReader()
          var result = null
          if(file){
            reader.onloadend = () => {
            var result = reader.result
            if(mode == 'default'){
                document.getElementById(to).src = result
            } else if (mode == 'msg') {
                this.message.imgSrc = result
            }
          }
            reader.readAsDataURL(file)
          } else {
              result = null
          }
      },
      select(chat){
        if(this.selectedItem){
            const previousRoom = this.selectedItem.id
        this.selectedItem = chat
        const currentRoom = this.selectedItem.id
        }
      },
      chooseTheme(theme){
        return function(){
            this.theme = theme
            document.getElementsByTagName('link')[1].href = `css/${theme}Theme.css`
            localStorage.setItem('theme',theme)
        }
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
          let form = document.getElementById('x')
          let formData = new FormData(form)
          this.modal.seen = false
      },
      openUserEditor(){
          this.modal.seen = true
          this.modal.option = "editMode"
      }
    },
    async mounted(){
        this.select(this.chats.allChats[0])
        document.getElementsByTagName('link')[1].href = `css/${this.theme}Theme.css`
        this.user.avatarUrl = 'avatars/' + this.user.avatarUrl
        this.Search()
        let messages = document.getElementById("messages")
        messages.scrollTo(0,messages.scrollHeight)
        document.getElementsByTagName('link')[1].href = `css/${this.theme}Theme.css`
        document.addEventListener('keydown',(e)=>{
            switch(e.code){
                case 'Escape' : {
                    this.modal = false
                }
            }
        })
    }
  }

 Vue.createApp(Messanger).mount('#app')

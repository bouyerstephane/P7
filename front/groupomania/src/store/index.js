import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import cookie from 'js-cookie';
import router from "@/router";

const axios = require("axios")

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        forum: {
            posts: []
        },
        forumCommentary: {
            post: {},
            commentaries: []
        },
        user: {
            userId: null,
            token: null,
            isAdmin: 0
        },
        account: {
            firstName: "",
            lastName: "",
            pseudo: "",
            email: "",
            password: ""
        },
        errormsg: {
            message: ""
        }
    },
    plugins: [createPersistedState({
        paths: ['user'],
        storage: {
            getItem: key => cookie.get(key),
            setItem: (key, value) => cookie.set(key, value, {expires: 1 / 48}),
            removeItem: key => cookie.remove(key)
        }
    })],
    mutations: {
        LOGIN(state, user) {
            console.log(user)
            state.user = {
                userId: user.user.userId,
                isAdmin: user.user.isAdmin,
                token: user.token
            }
        },
        ERRORMSG(state, error) {
            state.errormsg = {
                message: error
            }
        },
        GETFORUM(state, posts) {
            state.forum.posts.push(posts)
        },
        GETCOMMENTARY(state, commentary) {
            state.forumCommentary.commentaries.push(commentary)
        },
        GETCOMMENTARYPOST(state, post) {
            state.forumCommentary.commentaries = []
            state.forumCommentary.post = post
        },
        DISCONNECT(state) {
            cookie.remove('vuex')
            state.user = {}
        }
    },
    actions: {
        login: (store, log) => {
            axios.post('http://localhost:3000/api/auth/login', {
                pseudo: log.pseudo,
                password: log.password
            })
                .then(res => {
                    store.commit('LOGIN', res.data)
                    store.commit('ERRORMSG', null)
                    console.log(res.data.user.userId)
                    router.push('/forum')
                    //console.log(res.data.user);
                })
                .catch(error => {
                    store.commit('ERRORMSG', error.response.data.error)
                    console.log(error);
                });
        },
        signup: (store, account) => {
            axios.post('http://localhost:3000/api/auth/signup', {
                firstName: account.firstName,
                lastName: account.lastName,
                pseudo: account.pseudo,
                email: account.email,
                password: account.password,

            })
                .then(res => {
                    store.commit('ERRORMSG', null)
                    store.dispatch('login', {"pseudo": account.pseudo, "password": account.password})
                    console.log(res)
                })
                .catch(error => {
                    store.commit('ERRORMSG', error.response.data.error)
                    console.log(error)
                })
        },
        accountDelete: (store, request) => {
            if (confirm("Voulez vous vraiment supprimer votre compte ?")) {
                axios.delete("http://localhost:3000/api/auth/destroy", {
                    data: {
                        userId: request.userId,
                        password: request.password
                    }
                }).then(res => {
                    store.dispatch('disconnect')
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        getForum: (store, userId) => {
            axios.post('http://localhost:3000/api/forum/displayAll', {
                userId
            }, {
                headers: {
                    'Authorization': 'Bearer ' + store.state.user.token
                }
            })
                .then(res => {
                    if (store.state.forum.posts.length === 0) {
                        res.data.response.map(forum => {
                            store.commit('GETFORUM', forum)
                        })
                    }
                }).catch(error => {
                console.log(error)
            })
        },
        getCommentary: (store, request) => {
            axios.post('http://localhost:3000/api/forum/displayOne', {
                userId: request.userId,
                postId: request.postId
            }, {
                headers: {
                    'Authorization': 'Bearer ' + store.state.user.token
                }
            }).then(res => {
                console.log(res.data)
                store.commit("GETCOMMENTARYPOST", res.data.post)
                res.data.commentary.map(commentary => {
                    store.commit("GETCOMMENTARY", commentary)
                })

            }).catch(error => {
                console.log(error)
            })
        },
        disconnect: (store) => {
            store.commit("DISCONNECT")
            location.reload()
        },
        deletePost: (store, request) => {
            if (confirm("voulez vous supprimer le post ?")) {
                axios.delete('http://localhost:3000/api/forum/destroy', {
                    headers: {
                        'Authorization': 'Bearer ' + store.state.user.token
                    },
                    data: {
                        userId: request.userId,
                        postId: request.postId,
                        commentaryId: request.commentaryId
                    }
                })
                    .then(res => {
                        location.reload()
                        console.log(res)
                    })
                    .catch(error => {
                        alert(error.response.data.error)
                        console.log(error)
                    })
            }

        },
        addPost(store, request) {
            axios.post("http://localhost:3000/api/forum/submit", {
                    userId: request.userId,
                    post: request.post

                }, {
                    headers: {
                        'Authorization': 'Bearer ' + store.state.user.token
                    }
                }
            )
                .then(res => {
                    location.reload()
                    console.log(res)
                }).catch(error => {
                console.log(error)
            })
        },
        addCommentary(store, request) {
            axios.post("http://localhost:3000/api/forum/submitComm", {
                userId: request.userId,
                postId: request.postId,
                commentary: request.commentary

            }, {
                headers: {
                    'Authorization': 'Bearer ' + store.state.user.token
                }
            })
                .then(res => {
                    location.reload()
                    console.log(res)
                }).catch(error => {
                console.log(error)
            })
        },
        modifyPost(store, request) {
            axios.put("http://localhost:3000/api/forum/modify", {
                userId: request.userId,
                postId: request.postId,
                post: request.post,
                commentaryId: request.commentaryId,
                commentary: request.commentary
            }, {
                headers: {
                    'Authorization': 'Bearer ' + store.state.user.token
                }
            }).then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
        }

    },
    getters: {
        user: state => state.user,
        errormsg: state => state.errormsg,
        account: state => state.account,
        forum: state => state.forum,
        forumCommentary: state => state.forumCommentary
    },
})
;

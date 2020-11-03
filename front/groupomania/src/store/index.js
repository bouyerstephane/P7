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
        getUser: {},

    },
    plugins: [createPersistedState({
        paths: ['user'],

        storage: {
            key: "test",
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
        GETUSER(state, user) {
            state.getUser = user
        },

        GETFORUM(state, posts) {
            state.forum.posts.push(posts)
        },
        EMPTYPOST(state) {
            state.forum.posts = []
            state.forumCommentary.commentaries = []
        },
        GETCOMMENTARY(state, commentary) {
            state.forumCommentary.commentaries.push(commentary)
        },
        GETCOMMENTARYPOST(state, post) {
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
                    console.log(res.data.user.userId)
                    router.push('/forum')
                })
                .catch(error => {
                    console.log(error.response.data);
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
                .then(() => {
                    store.dispatch('login', {"pseudo": account.pseudo, "password": account.password})
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        },
        getUser: (store, userId) => {
            axios.get('http://localhost:3000/api/auth/getUser', {
                params: {
                    userId
                },
                headers: {
                    'Authorization': 'Bearer ' + store.state.user.token
                }
            }).then(res => {
                store.commit('GETUSER', res.data.user)
            }).catch(error => {
                console.log(error.response.data)
            })
        },
        modifyUser: (store, request) => {
            axios.put('http://localhost:3000/api/auth/modifyUser', {
                userId: request.userId,
                firstName: request.firstName,
                lastName: request.lastName,
                pseudo: request.pseudo,
                email: request.email,
                modifyPassword: request.modifyPassword,
                password: request.password
            }, {
                headers: {
                    'Authorization': 'Bearer ' + store.state.user.token
                }
            }).then(res => {
                store.dispatch('getUser', request.userId)
                console.log(res)
            }).catch(error => {
                store.dispatch('getUser', request.userId)
                console.log(error.response.data)
            })
        },
        accountDelete: (store, request) => {
            if (confirm("Voulez vous vraiment supprimer votre compte ?")) {
                axios.delete("http://localhost:3000/api/auth/destroy", {
                    headers: {
                        'Authorization': 'Bearer ' + store.state.user.token
                    },
                    data: {
                        userId: request.userId,
                        password: request.password
                    }
                }).then(res => {
                    store.dispatch('disconnect')
                    console.log(res)
                }).catch(error => {
                    console.log(error.response.data)
                })
            }
        },
        getForum: (store, userId) => {
            axios.get('http://localhost:3000/api/forum/displayAll', {
                params: {
                    userId: userId
                },
                headers: {
                    'Authorization': 'Bearer ' + store.state.user.token
                }
            })
                .then(res => {
                    store.commit('EMPTYPOST')
                    res.data.response.map(forum => {
                        store.commit('GETFORUM', forum)
                    })

                }).catch(error => {
                console.log(error.response.data)
            })
        },
        getCommentary: (store, request) => {
            axios.get('http://localhost:3000/api/forum/displayOne', {
                params: {
                    userId: request.userId,
                    postId: request.postId
                },
                headers: {
                    'Authorization': 'Bearer ' + store.state.user.token
                }


            }).then(res => {
                store.commit('EMPTYPOST')
                store.commit("GETCOMMENTARYPOST", res.data.post)
                res.data.commentary.map(commentary => {
                    store.commit("GETCOMMENTARY", commentary)
                })

            }).catch(error => {
                console.log(error.response.data)
            })
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
                        if (request.commentaryId) {
                            store.dispatch('getCommentary', {
                                userId: request.userId,
                                postId: request.commentaryPostId
                            })
                            console.log(request.commentaryId)
                        } else {
                            store.dispatch('getForum', request.userId)
                        }

                        console.log(res)
                    })
                    .catch(error => {
                        alert(error.response.data)
                        console.log(error.response.data)
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
                    store.commit('EMPTYPOST')
                    store.dispatch('getForum', request.userId)
                    console.log(res)
                }).catch(error => {
                console.log(error.response.data)
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
                    store.commit('EMPTYPOST')
                    store.dispatch('getCommentary', {userId: request.userId, postId: request.postId})
                    console.log(res)
                }).catch(error => {
                console.log(error.response.data)
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
                console.log(request.commentaryPostId)
                if (request.commentaryId) {
                    store.commit('EMPTYPOST')
                    store.dispatch('getCommentary', {userId: request.userId, postId: request.commentaryPostId})
                }
                console.log(res)
            }).catch(error => {
                store.commit('EMPTYPOST')
                store.dispatch('getCommentary', {userId: request.userId, postId: request.commentaryPostId})
                console.log(error.response.data)
            })
        },

        disconnect: (store) => {
            store.commit("DISCONNECT")
            location.reload()
        },

    },
    getters: {
        user: state => state.user,
        getUser: state => state.getUser,
        account: state => state.account,
        forum: state => state.forum,
        forumCommentary: state => state.forumCommentary
    },
})
;

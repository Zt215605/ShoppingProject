// export default{
//     install(Vue){

//     }
// }

// Vue 插件一定暴露一个对象
let myPlugins={};
myPlugins.install=function(Vue,options){
    // Vue.prototypr.$bus:任何组件都可以使用
    // Vue.directives
    // Vue.component
    // Vue.filter....
    Vue.directive(options.name,(element,binding)=>{
        element.innerHTML=binding.value.toUpperCase();
        console.log(binding); //binding中有个属性modifiers是一个对象，里面存储的是修饰符
       
    })

}

export default myPlugins;


//菜单配置
const menus = [
    {
        icon:     "el-icon-menu",
        title:    "权限管理",
        children: [
            { title: "首页", routerName: 'home.index' },
            { title: "模块配置", routerName: 'home.flowchart' },
            { title: "测试tab", routerName: 'home.test' }
        ]
    },
    {
        icon:  "el-icon-document",
        title: "角色管理",
        children: [
            { title: "角色管理", routerName: 'roleManage.index' }
            ]
    },
    {
        icon:  "el-icon-location",
        title: "人员管理",
        children: [
            { title: "人员管理", routerName: 'personManage.index' }
        ]
    },
    {
        icon:     "el-icon-menu",
        title:    "权限管理",
        children: [
            { title: "系统配置", routerName: 'config.system' },
            { title: "模块配置", routerName: 'config.module' },
            { title: "权限配置", routerName: 'config.right' }
        ]
    }
];

menus.forEach((menu1,index1)=>{
    menu1.index=index1.toString();
    if(menu1.children){
        menu1.children.forEach((menu2,index2)=>{
            menu2.index=index1+'.'+index2;
            if(menu2.children){
                menu2.children.forEach((menu3,index3)=>{
                    menu3.index=index1+'.'+index2+'.'+index3;
                })
            }
        })
    }
})


export default menus
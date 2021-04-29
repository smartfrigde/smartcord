class SCPerms {
    static checkPerms(pluginID, perms){
        SCApi.alert("SmartCord Permissions", `Are you sure you want to run ${pluginID}? It uses following perms: ${perms}`)
    }
};

module.exports = SCPerms;
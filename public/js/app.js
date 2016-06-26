function deleteBoard(ref) {
    $.ajax({
        method:"get",
        url:"/board/delete/"+JSON.parse($(ref).data("id"))
    }).success(function(data){
        if(data=="true"){
        }
    });
}

function deleteTask(ref) {
    $.ajax({
        method:"get",
        url:"/board/"+JSON.parse($(ref).data("boardid"))+"/delete/task/"+JSON.parse($(ref).data("id"))
    }).success(function(data){
        if(data=="true"){
        }
    });
}
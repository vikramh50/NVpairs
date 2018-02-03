$(function() {
    $("#add").click(function() {
        var name = $("#name").val();
        var save = {};
        var value = $("#value").val();
        save[name] = value;
        chrome.storage.sync.set(save);
        $("table").append("<tr><td>" + name + "</td>" +
                            "<td>" + value + "</td>" +
                            "<td><button class='remove' id='remove" +
                            "'>Remove</button>" +
                            "</td></tr>");
    });
    $(document).on("click", ".remove", function() {
        var name = $(this).parent().prev().prev().text();
        chrome.storage.sync.remove(name);
        $(this).parent().parent().remove();
    });
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
            var storageChange = changes[key];
            
        }
    });
    $("#clear").click(function() {
        $("table tr").not(":first").remove();
        chrome.storage.sync.clear();
    });
    chrome.storage.sync.get(null, function(tableData) {
        var count = 1;
        for(row in tableData) {
            var rowData = tableData[row];
            $("table").append("<tr><td>" + row + "</td>" +
                            "<td>" + rowData + "</td>" +
                            "<td><button class='remove' id='remove"
                            + count++ + "'>Remove</button>" +
                             "</td></tr>");
        }
    });
});
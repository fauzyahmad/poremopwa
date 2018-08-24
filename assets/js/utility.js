//Disini fungsi untuk membuat database IndexedDB
var dbPromise = idb.open('data-store', 3, function (db) {
    if(!db.objectStoreNames.contains('data-project')) {
        var dbKey = db.createObjectStore('data-project', {keyPath: 'id'});
        dbKey.createIndex('title', 'title', {unique: false});
    }
    if(!db.objectStoreNames.contains('data-boq_works')) {
        var dbBoq = db.createObjectStore('data-boq_works', {keyPath: 'id'});
        dbBoq.createIndex('boq_id', 'boq_id', {unique: false});
    }
    if(!db.objectStoreNames.contains('data-reports')) {
        var dbReport = db.createObjectStore('data-reports', {keyPath: 'id'});
        dbReport.createIndex('project_id', 'project_id', {unique: false});
    }
    if(!db.objectStoreNames.contains('data-update_report')) {
        var dbReportItem = db.createObjectStore('data-update_report', {keyPath: 'id'});
        dbReportItem.createIndex('report_id', 'report_id', {unique: false});
    }
    if(!db.objectStoreNames.contains('data-report_photo')) {
        var dbReportItemPhoto = db.createObjectStore('data-report_photo', {keyPath: 'id'});
        dbReportItemPhoto.createIndex('report_item_id', 'report_item_id', {unique: false});
    }
    if(!db.objectStoreNames.contains('data-shop-drawing')) {
        var dbShopDrawing = db.createObjectStore('data-shop-drawing', {keyPath: 'id'});
        dbShopDrawing.createIndex('project_id', 'project_id', {unique: false});
    }
    if(!db.objectStoreNames.contains('data-asbuilt-drawing')) {
        var dbAsbuiltDrawing = db.createObjectStore('data-asbuilt-drawing', {keyPath: 'id'});
        dbAsbuiltDrawing.createIndex('project_id', 'project_id', {unique: false});
    }
    // if(!db.objectStoreNames.contains('sync-data-project')) {
    //     db.createObjectStore('sync-data-project', {keyPath: 'username'});
    // }
});

function writeData(st, data) {
    return dbPromise
    .then(function (db) {
        var tx = db.transaction(st, 'readwrite');
        var store = tx.objectStore(st);
        store.put(data);
        return tx.complete; 
    });
}

function readAllData(st) {
    return dbPromise
    .then(function (db) {
        var tx = db.transaction(st, 'readonly');
        var store = tx.objectStore(st);
        return store.getAll();
    });
}

function readDataIndex(st, index, indexKey) {
    return dbPromise
    .then(function (db) {
        var tx = db.transaction(st, 'readonly');
        var store = tx.objectStore(st);
        var index = store.index(index);
        return index.getAll(indexKey);
    });
}

function clearAllData(st) {
    return dbPromise
    .then(function (db) {
        var tx = db.transaction(st, 'readwrite');
        var store = tx.objectStore(st);
        store.clear();
        return tx.complete;
    }).then(function () {
        console.log('Data Store'+' '+st+' '+'telah terhapus');
    })
}

function deleteItemFromData(st, id) {
    dbPromise
    .then(function (db) {
        var tx = db.transaction(st, 'readwrite');
        var store = tx.objectStore(st);
        store.delete(id);
        return tx.complete;
    })
    .then(function () {
        console.log('Item deleted!');
    });
}
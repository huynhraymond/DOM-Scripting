
/* Created by Raymond on 4/9/15. */
var parentNodes = [];

function Node(id) { this.id = id; }

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function createElement(elementType, parent, innerHtml, custom) {
    var element = document.createElement(elementType);

    if ( parent ) { parent.appendChild(element); }

    if ( innerHtml ) { element.innerHTML = innerHtml; }

    if ( typeof custom !== 'undefined' ) {
        for ( var prop in custom ) {
            element.setAttribute( prop, custom[prop] );
        }
    }

    return element;
}

// If active is set remove it, otherwise add it
function updateStatusContextMenu(element) { element.classList.toggle('active'); }

function getContextMenu(event, ul) {
    //event.preventDefault();

    ul.style.top = event.clientY + 'px';
    ul.style.left = event.clientX + 'px';

    ul.classList.toggle('active');
}

function addNewNode(event,  status, tagId) {

    var id, ul, li, text;

    // Add Folder/Document to root panel
    if ( event.target.parentNode.classList.contains('root') ) {
        ul = document.querySelector('ul#root-content');

        // Add new folder - thus add new node to list
        if (status) {

            id = uuid();

            var node = new Node(id);

            parentNodes.push(node);

            text = "folder";
        }

        else {
            text = "document";
        }

        li = createElement('li', ul, text);
        li.classList.add(text);
        if (id) { li.setAttribute('id', id); }
    }

    // Here - request adding come from Folder panel
    else {
        // to search for node of the caller's id
        var node;

        for ( var prop in parentNodes) {
            if ( parentNodes[prop].id == tagId ) {

                // Find whether node has children by ul tag id - if not create one
                if (!parentNodes[prop].childTagId) {
                    parentNodes[prop].childTagId = uuid();

                    ul = createElement('ul', document.getElementById(tagId));
                    ul.setAttribute( 'id', parentNodes[prop].childTagId );
                }

                else { ul = document.getElementById(parentNodes[prop].childTagId); }

                node = parentNodes[prop];
                break;
            }
        }

        // Whether new node is Folder or Document
        if (status) {
            text = 'folder';

            id = uuid();

            var child = new Node(id);

            parentNodes.push(child);
        }

        else {
            text = 'document';
        }

        li = createElement('li', ul, text);
        li.classList.add(text);
        if (id) { li.setAttribute('id', id); }

    }
}


(function() {
    var sectionExplore = document.querySelector('section.explore');
    var ulContextMenu = document.querySelector('ul#context-menu');

    // Remember the element id that trigger the add menu
    var tagId = undefined;

    // right click on the section explore panel - add new Folder/Document to the root panel
    sectionExplore.addEventListener('contextmenu', function(event) {

        event.preventDefault();

        // clear tagId
        tagId = undefined;

        // Disable right-click on folder and document structure
        if (event.target.classList.contains('document') || event.target.classList.contains('folder')) { return; }

        ulContextMenu.classList.add('root');

        getContextMenu( event, ulContextMenu);

    } );

    // Only folder is allow to call context menu
    sectionExplore.addEventListener('click', function(event) {
        event.preventDefault();

        // Ignore click on document structure
        if (event.target.classList.contains('document')) { return; }

        // Trigger click on folder structure - let context menu know its trigger by folder structure - set tagId
        ulContextMenu.classList.remove('root');
        tagId = event.target.id;

        getContextMenu( event, ulContextMenu);
    });

    //document.body.addEventListener('click', function() { updateStatusContextMenu(ulContextMenu); } );

    document.querySelector('li#new-folder').addEventListener('click', function(e) {
        updateStatusContextMenu(ulContextMenu);
        addNewNode(e, true, tagId);
        // reset tagId
        tagId = undefined;
    });

    document.querySelector('li#new-document').addEventListener('click', function(e) {
        updateStatusContextMenu(ulContextMenu);
        addNewNode(e, false, tagId);
        tagId = undefined;
    });

}());

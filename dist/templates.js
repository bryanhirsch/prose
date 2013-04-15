var templates = {"app":"<div class='header'>\n  <div class='limiter clearfix'>\n    <div class='fr user-status<%= !window.authenticated ? \" logged-out\" : \"\" %>'>\n    <% if (window.authenticated) { %>\n      <div class='dropdown-menu'>\n        <a href='#' class='round dropdown-hover'><%= app.username %></a>\n        <ul class='dropdown round arrow-top'>\n          <li><a class='logout' href='#'><strong>Logout</strong></a></li>\n        </ul>\n      </div>\n    <% } else { %>\n      <a class='button round' href='https://github.com/login/oauth/authorize?client_id=c602a8bd54b1e774f864&scope=repo,user,gist&redirect_uri=<%= encodeURIComponent(window.location.href) %>'>Sign in using Github</a>\n    <% } %>\n    </div>\n  </div>\n</div>\n\n<div id='heading' class='heading limiter clearfix'></div>\n\n<div class='application clearfix'>\n  <div id='content' class='content fl'></div>\n  <div class='sidebar fl'>\n    <div id='drawer' class='drawer'></div>\n\n    <div class='vert navigation'>\n      <ul class='project nav'>\n        <li>\n          <a href='/' class='icon round repos <% if (!app.state.mode) { %>active<% } %>'>\n            <span class='popup round arrow-left'>Explore Projects</span>\n          </a>\n        </li>\n        <% if (state.repo) { %>\n          <li>\n          <a href='#<%= user %>/<%= repo %>/tree/<%= branch %>' class='icon round repo <% if (app.state.mode === \"tree\") { %>active<% } %>'>\n              <span class='popup round arrow-left'><%= repo %></span>\n            </a>\n          </li>\n          <% if (window.authenticated) { %>\n            <li>\n              <a href='#<%= user %>/<%= repo %>/new/<%= branch %><%= path ? \"/\"+path : \"\"%>' class='icon round new new-file'>\n                <span class='popup round arrow-left'>New File</span>\n              </a>\n            </li>\n          <% } %>\n        <% } %>\n      </ul>\n\n      <% if (state.mode === 'edit' || state.mode === 'blob' || state.mode === 'new') { %>\n      <ul class='post-views nav'>\n        <li>\n          <a href='#' class='icon round edit' data-state='edit'>\n            <span class='popup round arrow-left'>Edit</span>\n          </a>\n        </li>\n        <% if (state.markdown || state.mode === 'new') { %>\n          <li>\n            <a href='#' class='icon round preview' data-state='preview'<% if (jekyll) { %>data-jekyll=true<% } %>>\n              <span class='popup round arrow-left'>Preview</span>\n            </a>\n          </li>\n        <% } %>\n        <li>\n          <a href='#' class='icon round settings' data-state='settings' data-drawer=true>\n            <span class='popup round arrow-left'>Post Settings</span>\n          </a>\n        </li>\n      </ul>\n      <% } %>\n    </div>\n  </div>\n</div>\n","files":"<% _.each(files, function(f, i) { %>\n  <% if (f.type === 'tree') { %>\n    <!-- folders -->\n    <li><a class='item' data-index='<%= i %>' href='#<%= user %>/<%= repo %>/tree/<%= branch %><%= f.path ? \"/\" +f.path : \"\" %>'>\n      <span class='icon inline small folder'></span>\n      <%= f.path === _.parentPath(currentPath) ? \"..\" : f.name %>\n    </a></li>\n  <% } else { %>\n    <!-- files -->\n    <%\n      var parts = f.name.split('.');\n      var extension = parts.pop().toLowerCase();\n      var filename = parts.slice(0, parts.length).join('');\n    %>\n\n    <% if (app.state.jekyll && extension === 'md') { %>\n      <li class='markdown'>\n        <a class='clearfix item' data-index='<%= i %>' href='#<%= user %>/<%= repo %>/edit/<%= branch %>/<%= f.path %>'>\n        <span class='fl icon round md'></span>\n        <span class='fl details'>\n          <h3><%= filename || 'Untitled' %></h3>\n          <span class='deemphasize'><%= f.name %></span>\n        </span>\n        </a>\n      </li>\n\n    <% } else { %>\n      <li><a class='light item' data-index='<%= i %>' href='#<%= user %>/<%= repo %>/edit/<%= branch %>/<%= f.path %>'>\n        <span class='icon inline small file <%= extension %>'></span>\n        <%= f.name || 'Untitled' %>\n      </a></li>\n    <% } %>\n\n  <% } %>\n<% }); %>\n","heading":"<% if (alterable) { %>\n  <div class='avatar round fl'><%= avatar %></div>\n  <div class='fl details'>\n    <h4><a class='user' href='#<%= parentUrl %>'><%= parent %></a></h4>\n    <input type='text' class='filepath' value='<%= title %>'>\n    <div class='mask'></div>\n  </div>\n<% } else { %>\n  <div class='avatar round fl'><%= avatar %></div>\n  <div class='fl details'>\n    <h4><a class='user' href='#<%= parentUrl %>'><%= parent %></a></h4>\n    <h2><a class='repo' href='#<%= titleUrl %>'><%= title %></a></h2>\n  </div>\n<% } %>\n","multiselect":"<label for='<%= name %>'><%= label %></label>\n<select name='<%= name %>' data-placeholder='<%= placeholder %>' multiple class='chzn-select'>\n  <% _(options).each(function(o) { %>\n    <% if (o.name) { %>\n     <option value='<%= o.value %>'><%= o.name %></option>\n    <% } else { %>\n     <option value='<%= o.value %>'><%= o.value %></option>\n    <% } %>\n  <% }); %>\n</select>\n","notification":"<% if (!window.authenticated) { %>\n<div class='notify <%= type %>'>\n  <div class='inner'>\n    Please login with your GitHub account to access that project.\n    <p><a class='button round' href='https://github.com/login/oauth/authorize?client_id=<%= window.app.auth.id %>&scope=repo, user&redirect_uri=<%= encodeURIComponent(window.location.href) %>'>Sign in</a></a>\n  </div>\n</div>\n<% } else { %>\n  <div class='notify <%= type %>'>\n    <div class='inner'>\n      <p><%= message %></p>\n      <p><a class='button create' href='#'>Create it </a></p>\n      <p><a class='button round' href='../'>Go back </a></p>\n    </div>\n  </div>\n<% } %>\n","post":"<div class='topbar toolbar'>\n  <div class='inner clearfix'>\n    <% if (markdown) { %>\n    <div class='dropdown-menu fr'>\n      <a href='#' class='round dropdown-hover'>Markdown</a>\n      <ul class='dropdown markdown-snippets round'>\n        <li><a href='#' data-snippet='<% print(\"# Heading\\n\\n\") %>'>Main Header</a></li>\n        <li><a href='#' data-snippet='<% print(\"## Sub Heading\\n\\n\") %>'>Sub Header</a></li>\n        <li><a href='#' data-snippet='<% print(\"```\\nvar foo;\\n```\\n\\n\"); %>'>Code</a></li>\n        <li><a href='#' data-snippet='<% print(\"[Google](http://google.com)\\n\\n\") %>'>Link</a></li>\n        <li><a href='#' data-snippet='<% print(\"![picture alt](http://placekitten.com/200/300)\\n\\n\") %>'>Image</a></li>\n        <li><a href='#' data-snippet='<% print(\"> We loved with a love that was more than love\\n\\n\"); %>'>Blockquote</a></li>\n        <li><a href='#' data-snippet='<% print(\"- item\\n- item\\n- item\\n\\n\"); %>'>List</a></li>\n        <li class='divider'></li>\n        <li><a href='http://daringfireball.net/projects/markdown/syntax' target='_blank' target='_blank'><strong>Learn More</strong></a></li>\n      </ul>\n    </div>\n    <% } %>\n  </div>\n</div>\n\n<div class='inner editor'>\n  <div class='inner views'>\n    <div id='diff' class='view prose diff'></div>\n    <div id='code' class='view active edit <% if (markdown) { %> markdown<% } %>'></div>\n    <% if (markdown) { %>\n      <div id='preview' class='view preview prose'><%= preview %></div>\n    <% } %>\n  </div>\n</div>\n","posts":"<div class='topbar content-search'>\n  <span class='icon search inline fr'></span>\n  <input type='text' id='filter' placeholder='Filter Files' />\n</div>\n\n<% if (path.length) { %>\n  <div class='breadcrumb'>\n    <a class='branch' href='#<%= [user, repo, \"tree\", branch].join(\"/\") %>'>..</a>\n    <% _.each(_.chunkedPath(path), function(p) { %>\n      <span class='slash'>/</span>\n      <a class='path' href='#<%= [user, repo, \"tree\", branch, p.url].join(\"/\") %>'><%= p.name %></a>\n    <% }); %>\n  </div>\n<% } %>\n\n<ul id='files' class='listing'></ul>\n","profile":"<div class='topbar content-search'>\n  <span class='icon search inline fr'></span>\n  <input type='text' id='filter' placeholder='Filter projects' />\n</div>\n\n<ul id='projects' class='listing'></ul>\n","projects":"<% if (state && (app.username === state.user)) { %>\n  <% _.each(owners, function(repos, owner) { %>\n      <% _.each(repos, function(r, i) { %>\n      <li class='clearfix' data-index='<%= i %>'>\n          <% if (r.private) { %>\n            <div class='fl icon round repo private'></div>\n          <% } else { %>\n            <div class='fl icon round repo'></div>\n          <% } %>\n\n          <div class='details fl'>\n            <a data-user='<%= r.owner.login %>' data-repo='<%= r.name %>' href='#<%= r.owner.login %>/<%= r.name %>'>\n              <h3><%= r.name %></h3>\n            </a>\n            <span class='deemphasize'><%= r.description %></span>\n          </div>\n\n          <div class='fl actions cleafix'>\n            <a\n              data-user='<%= r.owner.login %>'\n              data-repo='<%= r.name %>'\n              href='#<%= r.owner.login %>/<%= r.name %>'>\n              View Project\n            </a>\n            <% if (r.homepage) { %>\n              <a href='<%= r.homepage %>'>View Site</a>\n            <% } %>\n          </div>\n      </li>\n      <% }); %>\n    <% }); %>\n  <% } else { %>\n  <% _.each(repos, function(r, i) { %>\n    <li class='clearfix' data-index='<%= i %>'>\n        <% if (r.private) { %>\n          <div class='fl icon round repo private'></div>\n        <% } else { %>\n          <div class='fl icon round repo'></div>\n        <% } %>\n\n        <div class='details fl'>\n          <a data-user='<%= r.owner.login %>' data-repo='<%= r.name %>' href='#<%= r.owner.login %>/<%= r.name %>'>\n            <h3><%= r.name %></h3>\n          </a>\n          <span class='deemphasize'><%= r.description %></span>\n        </div>\n\n        <div class='fl actions cleafix'>\n          <a\n            data-user='<%= r.owner.login %>'\n            data-repo='<%= r.name %>'\n            href='#<%= r.owner.login %>/<%= r.name %>'>\n            View Project\n          </a>\n          <% if (r.homepage) { %>\n            <a href='<%= r.homepage %>'>View Site</a>\n          <% } %>\n        </div>\n    </li>\n  <% }); %>\n<% } %>\n","select":"<label for='<%= name %>'><%= label %></label>\n<select name='<%= name %>' data-placeholder='<%= placeholder %>' class='chzn-select'>\n  <% _(options).each(function(o) { %>\n    <% if (o.name) { %>\n     <option value='<%= o.value %>'><%= o.name %></option>\n    <% } else { %>\n     <option value='<%= o.value %>'><%= o.value %></option>\n    <% } %>\n  <% }); %>\n</select>\n","settings":"<% if (jekyll) { %>\n  <div id='meta' class='meta inner'></div>\n<% } %>\n\n<% if (window.authenticated) { %>\n  <div class='inner'>\n    <div class='commit'>\n      <textarea class='commit-message' placeholder='Describe your Changes'></textarea>\n      <a class='icon inline small cancel' href='#' title='ESC'>\n        &times;<span class='popup round arrow-left'>Cancel</span>\n      </a>\n    </div>\n\n    <a class='save button round' href='#'>\n      <%= writeable ? 'Save' : 'Submit Change' %>\n      <span class='popup round arrow-left'>⌘ + s</span>\n    </a>\n\n    <% if (jekyll && markdown) { %>\n      <a href='#' class='toggle publish button round'>Publish</a>\n    <% } %>\n\n    <% if (app.state.config && app.state.config.languages) { %>\n      <% _(app.state.config.languages).each(function(lang) { %>\n        <% if (metadata.lang && metadata.lang !== lang.key) { %>\n          <a class='translate round button' href='#<%= lang.key %>'>Translate to <%= lang.name %></a>\n        <% } %>\n      <% }); %>\n    <% } %>\n\n    <a class='delete button round' href='#'>Delete this File</a>\n  </div>\n<% } %>\n","sidebarOrganizations":"<% if (authenticated) { %>\n  <div class='inner'>\n    <h2 class='label'>Groups</h2>\n  </div>\n  <ul class='listing'>\n  <% if (organizations && organizations.length) { %>\n    <li>\n      <a href='#<%= app.username %>' title='<%= app.username %>'>\n        <span class='icon folder-group inline small'></span>\n        <%= app.username %>\n      </a>\n    </li>\n    <% _.each(organizations, function(org) { %>\n    <li>\n      <a href='#<%= org.login %>' title='<%= org.login %>'>\n        <span class='icon folder-group inline small'></span>\n        <%= org.login %>\n      </a>\n    </li>\n    <% }); %>\n  <% } %>\n  </ul>\n<% } %>\n","sidebarProject":"<% if (authenticated) { %>\n  <div class='inner'>\n    <% if (app.state.branches.length > 0) { %>\n      <h2 class='label'>Switch Branch</h2>\n      <select data-placeholder='Current Branch Name' class='chzn-select'>\n          <option value='#<%= [user, repo, \"tree\", app.state.branch].join(\"/\") %>' selected><%= app.state.branch %></option>\n        <% _.each(app.state.branches, function(branch) { %>\n          <option value='#<%= [user, repo, \"tree\", branch].join(\"/\") %>'><%= branch %></option>\n        <% }); %>\n      </select>\n    <% } %>\n  </div>\n<% } %>\n","start":"<% if (!authenticated) { %>\n  <div class='round splash'>\n    <h2 class='icon landing'>Prose</h2>\n    <div class='inner'>\n      <p>Prose is a content editor for GitHub designed for managing websites.</p>\n      <p><a href='/about.html'>Learn more</a></p>\n      <a class='round button' href='https://github.com/login/oauth/authorize?client_id=<%= window.app.auth.id %>&scope=repo,user,gist'>Authorize with GitHub</a>\n    </div>\n  </div>\n<% } %>\n","text":"<label for='<%= name %>'><%= label %></label>\n<input type='text' name='<%= name %>' value='<%= value %>' />\n"}; module.exports = templates;
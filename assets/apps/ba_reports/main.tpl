<div id="ba_reports_root"></div>
<% if (process.env.NODE_ENV === 'development') { %>
  <script src="<%= htmlWebpackPlugin.options.devServer %>/<%= htmlWebpackPlugin.files.js[0] %>"></script>
<% } else { %>
  <script src="{{ base_url }}/<%= htmlWebpackPlugin.files.js[0] %>"></script>
<% } %>

<div id="ba_slideshow_root"></div>
{% if my_env == 'development' %}
  <script src="<%= htmlWebpackPlugin.options.devServer %>/<%= htmlWebpackPlugin.files.js[0] %>"></script>
{% else %}
  <script src="{{ base_url }}/ba_slideshow/dist/<%= htmlWebpackPlugin.files.js[0] %>"></script>
{% endif %}

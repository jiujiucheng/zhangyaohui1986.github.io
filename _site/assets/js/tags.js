var edwin_all_tags = {
	
		

		'test' : [
			
				{
					'url':'/2017/08/02/hello-world.html',
					'title':'hello world',
					'date':'2017-08-02',
					'excerpt':'<p>我的第一篇github-pages的博客,jekyll构建,just test.</p>',
					'tags':[
						
						'test'
						
					]
				}
				
			
		]

	
		 , 

		'linux' : [
			
				{
					'url':'/2017/12/13/docker-repos-for-aliyun.html',
					'title':'阿里云docker仓库',
					'date':'2017-12-13',
					'excerpt':'<p>docker是越来越火了，在使用的过程中有没有感觉到下载速度慢？使用阿里云docker仓库解决，速度就嗖嗖的啦。话不多说，下面就开始阿里云docker仓库的使用之路。</p>',
					'tags':[
						
						'linux',
						
						'docker',
						
						'aliyun'
						
					]
				}
				,
			
				{
					'url':'/2017/11/07/ERR_INCOMPLETE_CHUNKED_ENCODING-%E9%97%AE%E9%A2%98%E6%8E%92%E6%9F%A5.html',
					'title':'ERR_INCOMPLETE_CHUNKED_ENCODING 问题排查',
					'date':'2017-11-07',
					'excerpt':'<p>开发调试一个接口时，chrom浏览器吐出部分内容，控制台报错:<code class="highlighter-rouge">Failed to load resource: net::ERR_INCOMPLETE_CHUNKED_ENCODING</code>,于是查看nginx 错误日志：</p><div class="highlighter-rouge"><pre class="highlight"><code>[crit] 7476#0: *954 open() "/usr/local/var/run/nginx/fastcgi_temp/8/02/0000000028" failed (13: Permission denied) while reading upstream, client: 127.0.0.1, server: 127.0.0.1, request: "GET /v1/report/error-list?dept_id=68 HTTP/1.1", upstream: "fastcgi://unix:/tmp/php-cgi.sock:", host: "127.0.0.1:8202"</code></pre></div><p>看起来是权限问题，于是查看权限：</p><div class="highlighter-rouge"><pre class="highlight"><code> ll /usr/local/var/run/nginx/proxy_tempdrwx------  12 _www  admin  408 11  7 14:24 fastcgi_temp</code></pre></div><p>果断修改之：</p><div class="highlighter-rouge"><pre class="highlight"><code>sudo chown -R www:www /usr/local/var/run/nginx/</code></pre></div><p>然后再测试下接口，chrome不再报错，内容全部返回，大功告成！</p>',
					'tags':[
						
						'linux',
						
						'nginx',
						
						'chrome'
						
					]
				}
				,
			
				{
					'url':'/2017/11/01/systemd-PrivateTmp%E7%9A%84%E5%9D%91.html',
					'title':'systemd PrivateTmp的坑',
					'date':'2017-11-01',
					'excerpt':'<h1 id="sytemd-privatetmp的坑">Sytemd PrivateTmp的坑</h1>',
					'tags':[
						
						'linux'
						
					]
				}
				
			
		]

	
		 , 

		'nginx' : [
			
				{
					'url':'/2017/11/07/ERR_INCOMPLETE_CHUNKED_ENCODING-%E9%97%AE%E9%A2%98%E6%8E%92%E6%9F%A5.html',
					'title':'ERR_INCOMPLETE_CHUNKED_ENCODING 问题排查',
					'date':'2017-11-07',
					'excerpt':'<p>开发调试一个接口时，chrom浏览器吐出部分内容，控制台报错:<code class="highlighter-rouge">Failed to load resource: net::ERR_INCOMPLETE_CHUNKED_ENCODING</code>,于是查看nginx 错误日志：</p><div class="highlighter-rouge"><pre class="highlight"><code>[crit] 7476#0: *954 open() "/usr/local/var/run/nginx/fastcgi_temp/8/02/0000000028" failed (13: Permission denied) while reading upstream, client: 127.0.0.1, server: 127.0.0.1, request: "GET /v1/report/error-list?dept_id=68 HTTP/1.1", upstream: "fastcgi://unix:/tmp/php-cgi.sock:", host: "127.0.0.1:8202"</code></pre></div><p>看起来是权限问题，于是查看权限：</p><div class="highlighter-rouge"><pre class="highlight"><code> ll /usr/local/var/run/nginx/proxy_tempdrwx------  12 _www  admin  408 11  7 14:24 fastcgi_temp</code></pre></div><p>果断修改之：</p><div class="highlighter-rouge"><pre class="highlight"><code>sudo chown -R www:www /usr/local/var/run/nginx/</code></pre></div><p>然后再测试下接口，chrome不再报错，内容全部返回，大功告成！</p>',
					'tags':[
						
						'linux',
						
						'nginx',
						
						'chrome'
						
					]
				}
				
			
		]

	
		 , 

		'chrome' : [
			
				{
					'url':'/2017/11/07/ERR_INCOMPLETE_CHUNKED_ENCODING-%E9%97%AE%E9%A2%98%E6%8E%92%E6%9F%A5.html',
					'title':'ERR_INCOMPLETE_CHUNKED_ENCODING 问题排查',
					'date':'2017-11-07',
					'excerpt':'<p>开发调试一个接口时，chrom浏览器吐出部分内容，控制台报错:<code class="highlighter-rouge">Failed to load resource: net::ERR_INCOMPLETE_CHUNKED_ENCODING</code>,于是查看nginx 错误日志：</p><div class="highlighter-rouge"><pre class="highlight"><code>[crit] 7476#0: *954 open() "/usr/local/var/run/nginx/fastcgi_temp/8/02/0000000028" failed (13: Permission denied) while reading upstream, client: 127.0.0.1, server: 127.0.0.1, request: "GET /v1/report/error-list?dept_id=68 HTTP/1.1", upstream: "fastcgi://unix:/tmp/php-cgi.sock:", host: "127.0.0.1:8202"</code></pre></div><p>看起来是权限问题，于是查看权限：</p><div class="highlighter-rouge"><pre class="highlight"><code> ll /usr/local/var/run/nginx/proxy_tempdrwx------  12 _www  admin  408 11  7 14:24 fastcgi_temp</code></pre></div><p>果断修改之：</p><div class="highlighter-rouge"><pre class="highlight"><code>sudo chown -R www:www /usr/local/var/run/nginx/</code></pre></div><p>然后再测试下接口，chrome不再报错，内容全部返回，大功告成！</p>',
					'tags':[
						
						'linux',
						
						'nginx',
						
						'chrome'
						
					]
				}
				
			
		]

	
		 , 

		'docker' : [
			
				{
					'url':'/2017/12/13/docker-repos-for-aliyun.html',
					'title':'阿里云docker仓库',
					'date':'2017-12-13',
					'excerpt':'<p>docker是越来越火了，在使用的过程中有没有感觉到下载速度慢？使用阿里云docker仓库解决，速度就嗖嗖的啦。话不多说，下面就开始阿里云docker仓库的使用之路。</p>',
					'tags':[
						
						'linux',
						
						'docker',
						
						'aliyun'
						
					]
				}
				
			
		]

	
		 , 

		'aliyun' : [
			
				{
					'url':'/2017/12/13/docker-repos-for-aliyun.html',
					'title':'阿里云docker仓库',
					'date':'2017-12-13',
					'excerpt':'<p>docker是越来越火了，在使用的过程中有没有感觉到下载速度慢？使用阿里云docker仓库解决，速度就嗖嗖的啦。话不多说，下面就开始阿里云docker仓库的使用之路。</p>',
					'tags':[
						
						'linux',
						
						'docker',
						
						'aliyun'
						
					]
				}
				
			
		]

	
}
<?xml version="1.0" encoding="UTF-8"?>
<!-- master.xsl
 * Master xsl file for Symphony template 	
 * Author: David Anderson 2011
 * dave@veodesign.co.uk
-->
<xsl:stylesheet version="1.0"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
		xmlns:date="http://exslt.org/dates-and-times"
		xmlns:exsl="http://exslt.org/common"
		xmlns:form="http://nick-dunn.co.uk/xslt/form-controls"
		extension-element-prefixes="exsl form date">

<!-- ********************************* -->
<!-- includes -->
<!-- ********************************* -->

<!-- symphony utils -->
<xsl:import href="typography.xsl"/>
<xsl:import href="html-truncate.xsl"/>
<xsl:import href="date-time.xsl"/>
<xsl:import href="form_builder.xsl"/>

<!--custom utils-->
<xsl:import href="navigation.xsl"/>
<xsl:import href="string.xsl"/>
<xsl:import href="image-format.xsl"/>
<xsl:import href="render-utils.xsl"/>

<xsl:output method="xml"
    doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
    doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
    omit-xml-declaration="yes"
    encoding="UTF-8"
    indent="yes" />


<!-- ********************************* -->
<!-- global variables -->
<!-- ********************************* -->
<xsl:variable name="settings" select="//data/settings/entry" />
<xsl:variable name="site-title" select="$settings/site-title" />
<xsl:variable name="destination"/>

<xsl:variable name="url-ajax" select="0"/>
<!-- ********************************* -->
<!-- root template -->
<!-- ********************************* -->

<xsl:template match="/">
	
	<xsl:choose>
		<xsl:when test="$url-ajax">
			<xsl:apply-templates match="data" />	
		</xsl:when>
		<xsl:otherwise>
			
			<xsl:comment><![CDATA[[if lt IE 7 ]><html xmlns:fb="http://ogp.me/ns/fb#" lang="en" class="no-js ie6 ]]><xsl:value-of select="concat('page-',$current-page)"/><![CDATA["><![endif]]]></xsl:comment>
					<xsl:comment><![CDATA[[if IE 7 ]><html xmlns:fb="http://ogp.me/ns/fb#" lang="en" class="no-js ie7 ]]><xsl:value-of select="concat('page-',$current-page)"/><![CDATA["><![endif]]]></xsl:comment>
					<xsl:comment><![CDATA[[if IE 8 ]><html xmlns:fb="http://ogp.me/ns/fb#" lang="en" class="no-js ie8 ]]><xsl:value-of select="concat('page-',$current-page)"/><![CDATA["><![endif]]]></xsl:comment>
					<xsl:comment><![CDATA[[if IE 9 ]><html xmlns:fb="http://ogp.me/ns/fb#" lang="en" class="no-js ie9 ]]><xsl:value-of select="concat('page-',$current-page)"/><![CDATA["><![endif]]]></xsl:comment>
					<xsl:comment><![CDATA[[if (gt IE 9)|!(IE)]><!]]></xsl:comment><html lang="en" xmlns:fb="http://ogp.me/ns/fb#" class=" page-{$current-page}"><xsl:comment><![CDATA[<![endif]]]></xsl:comment>
			<head>
				
				<!-- Basic Page Needs
			  	================================================== -->
			  	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<title><xsl:apply-templates select="data"  mode="site-title"/></title>
				
				<base href="{$root}/" />
				
				<!-- Meta
			  	================================================== -->
				<meta name="robots" content="index, follow" />
				<meta name="description">
					<xsl:attribute name="content"><xsl:apply-templates select="data"  mode="site-description"/></xsl:attribute>
				</meta>
				
				<meta name="google-site-verification" content="{//data/settings/entry/google-site-verification}" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
				
				<!-- Favicons
				================================================== -->
				<link rel="shortcut icon" href="{$workspace}/images/favicon.ico"/>
				<link rel="apple-touch-icon" href="{$workspace}/images/apple-touch-icon.png"/>
				<link rel="apple-touch-icon" sizes="72x72" href="{$workspace}/images/apple-touch-icon-72x72.png"/>
				<link rel="apple-touch-icon" sizes="114x114" href="{$workspace}/images/apple-touch-icon-114x114.png"/>
			
				<!-- Skeleton CSS
				================================================== -->
			   	<link rel="stylesheet" href="{$workspace}/css/base.css"/>
				<link rel="stylesheet" href="{$workspace}/css/skeleton.css"/>
				<link rel="stylesheet" href="{$workspace}/css/layout.css"/>
				
			    <!-- Template CSS
				================================================== -->   
				<link rel="stylesheet" href="{$workspace}/css/main.css" type="text/css"/>
				<link rel="stylesheet" href="{$workspace}/css/responsive.css" type="text/css"/>
				
				<!-- JS Plugin CSS
				================================================== --> 
				<link rel="stylesheet" href="{$workspace}/css/jqueryui-dotluv/jquery-ui-1.9.0.custom.css" type="text/css"/>
				<link rel="stylesheet" href="{$workspace}/css/select2/select2.css" type="text/css"/>
				<link rel="stylesheet" href="{$workspace}/css/colorbox.css" type="text/css"/>
				<link rel="stylesheet" href="{$workspace}/css/avgrund.css" type="text/css"/>
				<link rel="stylesheet" href="{$workspace}/css/reveal.css" type="text/css"/>
				<link rel="stylesheet" href="{$workspace}/css/jquery.mCustomScrollbar.css" type="text/css"/>
				
				<!-- FONTS
				================================================== -->
				<xsl:copy-of select="$settings/custom-font-html/node()" />
				
				<!--JS-->
				<script data-main="{$workspace}/js/main.js" src="{$workspace}/js/libs/require.js"></script>
			
			</head>
			
			<body class="page-{$current-page}">
				<input type="hidden" id="ga-code" value="{$settings/google-analytics}"/>
				<div id="header">
					<div id="header-logo">
						<a href="{$root}"></a>
					</div>	
					
					<div id="header-nav">
						<div class="item menu">
							<a href="{$root}/contact/">CALL <strong>01372 253 229</strong> TO BOOK </a>
						</div>
						<div class="item smm">
							<a class="facebook" href="{$settings/facebook-link}" target="_blank"></a>
						</div>
						<div class="item smm">
							<a class="twitter" href="{$settings/twitter-link}" target="_blank"></a>
						</div>
					</div>	
				</div>
				
				<!--OLD BACKBONE APPLICATION CODE -->
				<div id="application">
					<xsl:apply-templates select="data"/>
					<div id="search-workflow"></div>
				</div>
				
				<!-- NEW MARIONETTE CODE
				 *
				 * Transition to marionette in progress
				 *
				-->
				<div id="main"></div>
				
				
				<div class="avgrund-popup">
					<div id="avgrund-inner" class="container clearfix"></div>
				</div>
				<div class="avgrund-cover"></div>
				
				<!--
				<div id="footer" class="clearfix">
					<div class="footer-copyright">
						<div class="inner"><xsl:text>Copyright LSR Sports </xsl:text><xsl:value-of select="$this-year"/></div>
					</div>
					
					<div class="footer-nav">	
						<div class="inner clearfix">
							<ul>
								<xsl:for-each select="data/info-pages-footer/entry">
									<li>
										<a href="{$root}/info/{title/@handle}/">
											<xsl:value-of select="title"/>
										</a>
									</li>
									<li> | </li>
								</xsl:for-each>
								<li><a href="http://lsrsports.com">LSR Sports</a></li>
								<li> | </li>
								<li><a href="{$root}/contact/">Contact</a></li>
							</ul>
						</div>
					</div>
						
					<div class="footer-legal">
						<div class="inner">Indulge by LSR Holidays is a trading name of LSR Sports LTD.</div>
					</div>						
				</div>
				-->
				<!--
				<a href="http://www.protectedtravelservices.com/consumer-protection.html.html" target="_blank" class="pts-logo"></a>			

				<a href="http://www.protectedtravelservices.com/consumer-protection.html.html" target="_blank" class="pts-logo footer-logo"></a>
				<a href="http://www.caa.co.uk/application.aspx?catid=490&amp;pagetype=65&amp;appid=2&amp;mode=detailnosummary&amp;atolNbr=10677" target="_blank" class="atol-logo footer-logo"></a>			
				-->
			</body>
			</html>
		</xsl:otherwise>
	</xsl:choose>        	
                
</xsl:template>


<!--site title-->
<xsl:template match="data" mode="site-title" priority="-1">

	<!--see what the page title is-->
	<xsl:choose>
		<xsl:when test="$page-title='Home'">
			<xsl:value-of select="$site-title" />
			<xsl:text> - Homepage </xsl:text>
		</xsl:when>

		
		<!--otherwise nothing found -->		
		<xsl:otherwise>
			<xsl:value-of select="$page-title" />
			<xsl:text> - </xsl:text>		
			<xsl:value-of select="$site-title" />
		</xsl:otherwise>	
	</xsl:choose>
</xsl:template>

<!--meta-->
<xsl:template match="data" mode="site-description" priority="-1">	
	<xsl:value-of select="//data/settings/entry/site-description" />
</xsl:template>

<xsl:template match="data" mode="init-js" priority="-1"></xsl:template>


</xsl:stylesheet>
<?xml version="1.0" encoding="UTF-8"?>
<!-- render
 * Rendering Utilities	
 * Author: David Anderson 2012
 * dave@veodesign.co.uk
-->
<xsl:stylesheet version="1.0"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
		xmlns:date="http://exslt.org/dates-and-times"
		xmlns:exsl="http://exslt.org/common"
		xmlns:form="http://nick-dunn.co.uk/xslt/form-controls"
		extension-element-prefixes="exsl form date">
		
<xsl:template name="render-bg-image">
	<xsl:param name="image" />
	<xsl:param name="default-mode" />
	
	<xsl:attribute name="style">
		<xsl:choose>
			<xsl:when test="not($image = 'none')">
				<xsl:variable name="img-path">	
					<xsl:call-template name="image-path">
						<xsl:with-param name="file" select="$image/image/filename" />
						<xsl:with-param name="path" select="$image/image/@path"/>
						<xsl:with-param name="height" select="1100" />
						<xsl:with-param name="width" select="1600" />
						<xsl:with-param name="mode" select="'crop-fill'" />
						<xsl:with-param name="default-mode" select="$default-mode" />
					</xsl:call-template>
				</xsl:variable>
				<xsl:text>background-image: url(</xsl:text>
				<xsl:value-of select="$img-path"/>
				<xsl:text>);</xsl:text>
			</xsl:when>
			
			<xsl:otherwise>
			 </xsl:otherwise>
		</xsl:choose>
	</xsl:attribute>
</xsl:template>

<!--==============================================-->

<!--TEMPLATES FOR RENDERING BROWSER INTERFACES-->

<!--==============================================-->
<!--==============================================-->
<!--
<xsl:call-template name="render-tab-browser">
	<xsl:with-param name="tab-title" select="" />
	<xsl:with-param name="items" select="" />
	<xsl:with-param name="base-url" select="concat($root,'/')" />
	<xsl:with-param name="title-node" select="'title'" />
	<xsl:with-param name="content-node" select="'content'" />
	<xsl:with-param name="content-node-mode" select="'normal | last-three'" />
	<xsl:with-param name="image-node" select="'images" />
</xsl:call-template>
-->

<xsl:template name="render-tab-browser">
	<xsl:param name="tab-title"/>
	<xsl:param name="items"/>
	<xsl:param name="base-url" />
	<xsl:param name="link-url" select="$base-url" />
	<xsl:param name="title-node" select="'title'" />
	<xsl:param name="content-node" select="'content'" />
	<xsl:param name="content-node-mode" select="'normal'" />
	<xsl:param name="image-node" select="'images'" />

	
	<xsl:variable name="pagination-total" select="ceiling(count($items) div 3)"/>
	
	<div class="application-tabs-inner container">
		
		<h1 class="tab-title tab-bg">
			<xsl:value-of select="$tab-title"/>
		</h1>
		<div class="carousel-position tab-bg">
			<span class="pos-start">1</span>
			<span>-</span>
			<span class="pos-end">
				<xsl:choose>
					<xsl:when test="count($items) &gt; 2">3</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="count($items)"/>
					</xsl:otherwise>
				</xsl:choose>
			</span>
			<span class="grey"> of </span>
			<span class="grey"><xsl:value-of select="count($items)"/></span> 
		</div>
	
		<div class="tab-bg-chrome">
			<div class="tl-carousel">
				
				<div class="clearfix">
					<div class="col-left">
						<a class="nav carousel-left" href="#">&lt;</a>			
					</div>
					<div class="col-middle clearfix html-content">
						<div class="carousel-inner">
							<xsl:for-each select="$items">
							
								<xsl:variable name="title" select="./node()[name() = $title-node]"/>
								<xsl:variable name="content" select="./node()[name() = $content-node]"/>
								<xsl:variable name="images" select="./node()[name() = $image-node]"/>
							
							
								<xsl:variable name="is-last">
									<xsl:if test="position() = count(../node())">last</xsl:if>
								</xsl:variable>
								<div class="tl-item {$is-last}">
									
									<a href="{$link-url}/{$title/@handle}/">
										<xsl:call-template name="img">
											<xsl:with-param name="src" select="$images/item/image/filename"/>
											<xsl:with-param name="path" select="$images/item/image/@path" />
											<xsl:with-param name="width" select="'256'" />
											<xsl:with-param name="height" select="'170'"/>
											<xsl:with-param name="alt" select="images/item/title"/>
											<xsl:with-param name="mode" select="'crop-fill'"/>
											<xsl:with-param name="default-mode" select="'hotel'" />
										</xsl:call-template>
									</a>
										
									<h2>
										<xsl:value-of select="$title"/>
									</h2>
									
									<div class="content">
										<xsl:choose>
											<xsl:when test="$content-node-mode = 'last-three' and $content/ul/li">
												<ul>
													<xsl:variable name="li-count" select="count($content/ul/li)"/>
													<xsl:copy-of select="$content/ul/li[position() &gt; ($li-count - 3)]" />
												</ul>
											</xsl:when>
											<xsl:otherwise>
												<xsl:call-template name="truncate">
												<xsl:with-param name="node" select="$content" />
												<xsl:with-param name="limit" select="'100'" />
											</xsl:call-template>	
											</xsl:otherwise>
										</xsl:choose>										
									</div>
									<div class="find-out-more clearfix">
										<a href="{$link-url}/{$title/@handle}/" class="action-button action-next"><span class="btn-arrow right white"></span>Find Out More</a>
									</div>
								</div>			
							</xsl:for-each>
						</div>
					</div>
					<div class="col-right">
						<a class="nav carousel-right" href="#">&gt;</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</xsl:template>


<!-- DETAIL VIEW -->

<!--
<xsl:call-template name="render-tab-detail">
	<xsl:with-param name="tab-title" select="" />
	<xsl:with-param name="item" select="" />
	<xsl:with-param name="base-url" select="" />
	<xsl:with-param name="title-node" select="" />
	<xsl:with-param name="content-top-node" select="" />
	<xsl:with-param name="content-bottom-node" select="" />
	<xsl:with-param name="image-node" select="" />
	<xsl:with-param name="label-content-top" select="" />
	<xsl:with-param name="label-content-bottom" select="" />
	<xsl:with-param name="content-bottom-right" select="" />
</xsl:call-template>
-->

<xsl:template name="render-tab-detail">

	<xsl:param name="item"/>
	<xsl:param name="base-url" />
	
	<xsl:param name="allow-enquiry" select="$item/allow-enquiry" />

	<xsl:param name="title-node" select="'title'" />
	<xsl:param name="content-top-node" select="'overview'" />
	<xsl:param name="content-bottom-node" select="'whats-included'" />
	<xsl:param name="image-node" select="'images'" />
	
	<xsl:param name="label-content-top" select="'Overview'" />
	<xsl:param name="label-content-bottom" select="'What is Included'" />
	
	<xsl:param name="title" select="$item/node()[name() = $title-node]"/>
	<xsl:param name="content-top" select="$item/node()[name() = $content-top-node]/node()"/>
	<xsl:param name="content-bottom" select="$item/node()[name() = $content-bottom-node]/node()"/>
	<xsl:param name="images" select="$item/node()[name() = $image-node]"/>
	
	<xsl:param name="content-bottom-right"/>
	
	<div class="application-tabs-inner container">
		<div class="tabs-content tab-bg">
			<div class="tl-basic-content clearfix html-content">
				<div class="top">
					<xsl:if test="$allow-enquiry = 'Yes'">
						<a class="tab-enquire-now action-button yellow" href="#"><span class="btn-arrow right black"></span>Enquire Now</a>
					</xsl:if>
					
					<a class="tab-back-button action-button action-back" href="{$base-url}"><span class="btn-arrow left white"></span>Back</a>
					
					<h1><xsl:value-of select="$title"/></h1>
				</div>
			
				<div class="clearfix">
					<div class="eight columns ">
						<div class="col-left">
							<h2>
								<xsl:value-of select="$label-content-top"/>
							</h2>
							<xsl:copy-of select="$content-top"/>
							<xsl:if test="string-length($content-bottom) &gt; 0">
								<hr/>
								<h2>
									<xsl:value-of select="$label-content-bottom"/>
								</h2>
								<xsl:copy-of select="$content-bottom"/>
							</xsl:if>
						</div>
					</div>
					<div class="six columns ">
						<div class="col-right">
							<div class="clearfix">
								<xsl:for-each select="$images/item">
									<div>
										<xsl:attribute name="class">
											<xsl:choose>
												<xsl:when test="position() mod '2' = '1'">image-item</xsl:when>
												<xsl:when test="position() mod '2' = '0'">last image-item</xsl:when>
												<xsl:otherwise>image-item</xsl:otherwise>
											</xsl:choose>
										</xsl:attribute>
										
										<a class="colorbox-link" title="{title}" rel="colorbox">
											<xsl:attribute name="href">
												<xsl:call-template name="image-path">
													<xsl:with-param name="mode" select="'crop-fill'"/>
													<xsl:with-param name="file" select="image/filename"/>
													<xsl:with-param name="path" select="image/@path"/>		
													<xsl:with-param name="width" select="'800'"/>
													<xsl:with-param name="height" select="'600'"/>
													<xsl:with-param name="default-mode" select="'hotel'" />
												</xsl:call-template>
											</xsl:attribute>
											
											<xsl:call-template name="img">
												<xsl:with-param name="src" select="image/filename"/>
												<xsl:with-param name="path" select="image/@path" />
												<xsl:with-param name="width" select="'141'" />
												<xsl:with-param name="height" select="'141'"/>
												<xsl:with-param name="alt" select="title"/>
												<xsl:with-param name="mode" select="'crop-fill'"/>
												<xsl:with-param name="default-mode" select="'hotel'" />
											</xsl:call-template>
										</a>
									</div>
								</xsl:for-each>
							</div>
							
							<xsl:if test="$content-bottom-right">
								<div class="content-bottom-right clearfix">
									<xsl:copy-of select="$content-bottom-right" />
								</div>
							</xsl:if>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</xsl:template>

		
</xsl:stylesheet>
<?php

	require_once(TOOLKIT . '/class.datasource.php');

	Class datasourcedeals_all extends SectionDatasource{

		public $dsParamROOTELEMENT = 'deals-all';
		public $dsParamORDER = 'null';
		public $dsParamPAGINATERESULTS = 'yes';
		public $dsParamLIMIT = '100';
		public $dsParamSTARTPAGE = '1';
		public $dsParamREDIRECTONEMPTY = 'no';
		public $dsParamSORT = 'system:id';
		public $dsParamHTMLENCODE = 'yes';
		public $dsParamASSOCIATEDENTRYCOUNTS = 'no';
		

		

		public $dsParamINCLUDEDELEMENTS = array(
				'title',
				'overview: formatted',
				'published',
				'order',
				'image: title',
				'image: image',
				'description: formatted'
		);
		

		public function __construct($env=NULL, $process_params=true){
			parent::__construct($env, $process_params);
			$this->_dependencies = array();
		}

		public function about(){
			return array(
				'name' => 'Deals: All',
				'author' => array(
					'name' => 'David Anderson',
					'website' => 'http://localhost/~david/lsr-holidays-content/public_html',
					'email' => 'dave@veodesign.co.uk'),
				'version' => 'Symphony 2.3.1',
				'release-date' => '2013-02-25T07:49:09+00:00'
			);
		}

		public function getSource(){
			return '4';
		}

		public function allowEditorToParse(){
			return true;
		}

	}

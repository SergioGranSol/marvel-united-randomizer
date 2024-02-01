const CONSTANTS = {
BOXES: ['id	season	name	isCore',
'1	0	Convention Exclusives	0',
'2	1	Marvel United	1',
'3	1	Enter the Spider-Verse	0',
'4	1	Guardians of the Galaxy Remix	0',
'5	1	Return of the Sinister Six	0',
'6	1	Rise of the Black Panther	0',
'7	1	Tales of Asgard	0',
'8	1	The Infinity Gauntlet	0',
'9	1	United Promos	0',
'10	2	Marvel United X-Men	1',
'11	2	Blue Team	0',
'12	2	Days of Future Past	0',
'13	2	Deadpool	0',
'14	2	Fantastic Four	0',
'15	2	First Class	0',
'16	2	Gold Team	0',
'17	2	Phoenix Five	0',
'18	2	The Horsemen of Apocalypse	0',
'19	2	X-Force	0',
'20	2	Mutant Promos	0',
'21	3	Marvel United Multiverse	1',
'22	3	Marvel United Spider-Geddon	1',
'23	3	Annihilation	0',
'24	3	Civil War	0',
'25	3	Maximum Carnage	0',
'26	3	Secret Invasion	0',
'27	3	The Age of Apocalypse	0',
'28	3	The Coming of Galactus	0',
'29	3	War of Kings	0',
'30	3	World War Hulk	0',
'31	3	Multiverse Promos	0'],
CHALLENGES: ['id	name',
'1	Moderate Challenge I',
'2	Moderate Challenge II',
'3	Hard Challenge I',
'4	Hard Challenge II',
'5	Heroic Challenge I',
'6	Heroic Challenge II',
'7	Endangered Locations Challenge',
'8	Secret Identity Challenge',
'9	Hazardous Locations Challenge',
'10	Danger Room Challenge',
'11	Takeover Challenge',
'12	Plan B Challenge',
'13	Traitor Challenge',
'14	Accelerated Villain Challenge',
'15	Sentinel I Challenge',
'16	Sentinel II Challenge',
'17	Sentinel III Challenge',
'18	Deadpool Chaos Challenge',
'19	Dark Carnage Challenge',
'20	Advanced Training Challenge',
'21	Complications Challenge'],
COMPANIONS: ['id	name	box	position',
'1	Alligator Loki	31	50,98,250',
'2	Cosmo	31	52,70',
'3	Goose	31	50,100,250',
'4	Jeffrey	31	34,94,200',
'5	Lockheed	31	85,68',
'6	Redwing	31	50,75',
'7	Throg	31	65,63'],
HEROES: ['id	name	equipments	isFF	box	isAntiHero	position',
'1	Deadpool (X-Force)	0	0	1	0	49,48,320',
'2	Hulk (Gray)	0	0	1	0	90,28,340',
'3	Ant-Man	2	1	2	0	75,47,290',
'4	Black Widow	2	0	2	0	83,37,360',
'5	Captain America	1	0	2	0	24,30,375',
'6	Captain Marvel	0	0	2	0	21,20,360',
'7	Hulk	0	0	2	0	90,28,340',
'8	Iron Man	3	0	2	0	75,25',
'9	Wasp	2	0	2	0	89,40',
'10	Ghost-Spider	1	0	3	0	19,33,295',
'11	Miles Morales	1	0	3	0	66,30,300',
'12	Spider-Ham	1	0	3	0	94,77,260',
'13	Spider-Man	1	1	3	0	44,32,290',
'14	Gamora	1	0	4	0	20,30,355',
'15	Groot	0	0	4	0	80,17',
'16	Rocket Racoon	0	0	4	0	85,40,280',
'17	Star-Lord	2	0	4	0	73,41,360',
'18	Black Panther	2	1	6	0	90,36',
'19	Shuri	0	0	6	0	76,31',
'20	Winter Soldier	0	0	6	0	8,34',
'21	Beta Ray Bill	1	0	7	0	82,52',
'22	Korg	0	0	7	0	25,35',
'23	Thor	1	0	7	0	25,36',
'24	Valkyrie	0	0	7	0	85,36',
'25	Adam Warlock	0	0	9	0	80,20,375',
'26	America Chavez	0	0	9	0	78,42',
'27	Black Cat	0	0	9	0	88,48,370',
'28	Blade	1	0	9	0	26,35,350',
'29	Daredevil	1	0	9	0	79,21',
'30	Doctor Strange	0	0	9	0	81,49,330',
'31	Drax	0	0	9	0	14,38,360',
'32	Elektra	1	0	9	0	11,44,335',
'33	Falcon	0	0	9	0	57,34,345',
'34	Ghost Rider	2	1	9	0	68,60',
'35	Hawkeye	4	0	9	0	9,41',
'36	Howard the Duck	0	0	9	0	88,25',
'37	Iron Fist	0	0	9	0	16,36,305',
'38	Jessica Jones	0	0	9	0	75,41',
'39	Luke Cage	0	0	9	0	85,25',
'40	Mantis	0	0	9	0	86,38',
'41	Mockingbird	1	0	9	0	82,40',
'42	Moon Knight	2	0	9	0	21,40',
'43	Ms. Marvel	0	0	9	0	12,32,320',
'44	Nebula	0	0	9	0	80,27,300',
'45	Nick Fury	1	0	9	0	29,44',
'46	Nova	0	1	9	0	90,25,300',
'47	Okoye	0	0	9	0	79,31',
'48	Punisher	0	0	9	0	77,37,380',
'49	Quicksilver	0	0	9	0	12,38,300',
'50	Scarlet Witch	0	0	9	0	14,25,320',
'51	Shang Chi	0	0	9	0	86,30',
'52	She-Hulk	0	1	9	0	21,34,390',
'53	Spider-Man 2099	0	0	9	0	63,76,280',
'54	Spider-Woman	0	0	9	0	88,34,370',
'55	Squirrel Girl	0	0	9	0	62,46,400',
'56	Venom	0	0	9	0	65,54',
'57	Vision	0	0	9	0	91,16,330',
'58	War Machine	3	0	9	0	21,33,330',
'59	Yondu	0	0	9	0	27,37,400',
'60	Beast	0	0	10	0	30,38',
'61	Cyclops	0	0	10	0	19,20,350',
'62	Jean Grey	0	0	10	0	19,35,350',
'63	Professor X	0	0	10	0	83,31',
'64	Storm	0	1	10	0	77,37,420',
'65	Wolverine	0	0	10	0	76,43',
'66	Juggernaut	0	0	1	30	20,41',
'67	Magneto	1	0	10	31	17,26,430',
'68	Mystique	0	0	10	32	37,36',
'69	Banshee	0	0	11	0	46,51,350',
'70	Gambit	1	0	11	0	88,41,370',
'71	Jubilee	0	0	11	0	81,31',
'72	Psylocke	0	0	11	0	21,32',
'73	Rogue	0	0	11	0	68,38',
'74	Mister Sinister	0	0	1	33	22,33,400',
'75	Logan	0	0	12	0	21,43',
'76	Deadpool	0	0	13	0	31,49,420',
'77	Lady Deadpool	0	0	13	0	39,42,400',
'78	Bob, Agent of Hydra	0	0	13	36	84,32',
'79	Human Torch	0	1	14	0	72,43,360',
'80	Invisible Woman	0	1	14	0	81,28,340',
'81	Mister Fantastic	0	1	14	0	35,24,450',
'82	Silver Surfer	0	0	14	0	25,26,400',
'83	Thing	0	1	14	0	17,30,450',
'84	Doctor Doom	0	0	14	38	21,23,390',
'85	Angel	0	0	15	0	78,44',
'86	Beast (Youngh)	0	0	15	0	76,36',
'87	Cyclops (Youngh)	0	0	15	0	75,40,285',
'88	Iceman (Youngh)	0	0	15	0	4,35',
'89	Marvel Girl	0	0	15	0	17,25,300',
'90	Archangel	0	0	16	0	42,49,425',
'91	Bishop	0	0	16	0	77,43',
'92	Colossus	0	0	16	0	29,28,350',
'93	Forge	0	0	16	0	28,37,345',
'94	Iceman	0	1	16	0	25,21,390',
'95	Hope Summers	0	0	17	0	30,36,340',
'96	Apocalypse	0	0	18	53	24,20,380',
'97	Cable	0	0	19	0	69,45,350',
'98	Cannonball	0	0	19	0	32,33,400',
'99	Domino	0	0	19	0	28,33',
'100	Shatterstar	0	0	19	0	37,54,370',
'101	Blink	0	0	20	0	38,35',
'102	Boom-Boom	0	0	20	0	79,48,370',
'103	Captain Britain	0	0	20	0	81,26,360',
'104	Cloak	0	0	20	0	25,24,355',
'105	Dagger	0	0	20	0	90,43,330',
'106	Dazzler	0	0	20	0	11,35',
'107	Doop	0	0	20	0	78,41',
'108	Fantomex	0	0	20	0	72,31,355',
'109	Feral	0	0	20	0	38,68,350',
'110	Firestar	0	0	20	0	70,20',
'111	Guardian	0	0	20	0	19,24,370',
'112	Gwenpool	0	0	20	0	95,56,400',
'113	Havok	0	0	20	0	85,31',
'114	Kitty Pryde	0	0	20	0	79,49,300',
'115	Longshot	0	0	20	0	58,80',
'116	Magik	1	0	20	0	81,33,315',
'117	Mirage	0	0	20	0	8,36,340',
'118	Multiple Man	0	0	20	0	12,30,330',
'119	Nightcrawler	0	0	20	0	38,41,355',
'120	Northstar	0	0	20	0	31,29,355',
'121	Old Man Logan	0	0	20	0	32,38,355',
'122	Phoenix	0	0	20	0	24,29,340',
'123	Pixie	0	0	20	0	70,46,300',
'124	Polaris	0	0	20	0	29,48',
'125	Puck	0	0	20	0	60,84',
'126	Sasquatch	0	0	20	0	86,48',
'127	Snowbird	0	0	20	0	21,20,410',
'128	Storm (Mohawk)	0	0	20	0	20,43',
'129	Strong Guy	0	0	20	0	32,32,350',
'130	Sunfire	0	0	20	0	62,32,300',
'131	Sunspot	0	0	20	0	78,31',
'132	Warlock	0	0	20	0	78,30,380',
'133	Warpath	0	0	20	0	84,39,340',
'134	Weapon X	0	0	20	0	58,42,365',
'135	Wolfsbane	0	0	20	0	64,46',
'136	X-23	0	0	20	0	34,49',
'137	Emma Frost	0	0	20	73	25,29,340',
'138	Legion	0	0	20	74	73,60,330',
'139	Marrow	0	0	20	75	77,39,350',
'140	Namor	1	0	20	76	33,26,360',
'141	Spiral	0	0	20	77	28,40',
'142	Black Panther (Shuri)	2	0	21	0	58,37,400',
'143	Captain Carter	1	0	21	0	86,49',
'144	Ironheart	0	0	21	0	11,34',
'145	Loki (Hero)	1	0	21	0	82,28,330',
'146	Mighty Thor	1	0	21	0	26,35,400',
'147	Spider-Man 2099 (Original Suit)	0	0	21	0	31,56,340',
'148	Cosmic Ghost Rider	2	0	21	81	15,31,350',
'149	Peni Parker	3	0	22	0	31,17,580',
'150	Scarlet Spider	1	0	22	0	90,33,335',
'151	Silk	0	0	22	0	77,37,340',
'152	Spider-Man Noir	0	0	22	0	23,47,400',
'153	Spider-Punk	1	0	22	0	78,41,420',
'154	Symbiote Spider-Man	0	0	22	0	24,37,370',
'155	Anti-Venom	0	0	22	84	27,44',
'156	Superior Spider-Man	2	0	22	85	77,61,450',
'157	Moondragon	0	0	23	0	17,30,385',
'158	Nova Prime	0	0	23	0	20,31,380',
'159	Phyla-Vell	0	0	23	0	13,39,350',
'160	Quasar	0	0	23	0	17,19,380',
'161	Captain America (Classic)	1	0	24	0	87,34,420',
'162	Goliath	0	0	24	0	17,15,330',
'163	Hulkling	2	0	24	0	29,44,450',
'164	Iron Man (Civil War)	3	0	24	0	26,27,350',
'165	Iron Spider	2	0	24	0	83,44,360',
'166	Kate Bishop	4	0	24	0	69,35,400',
'167	Spectrum	0	0	24	0	24,47,420',
'168	Tigra	0	0	24	0	91,50,400',
'169	Wonder Man	0	0	24	0	18,16,410',
'170	Yellowjacket	1	0	24	0	80,34',
'171	Morbius	0	0	25	95	64,34',
'172	Maria Hill	0	0	26	0	76,30,330',
'173	Nick Fury, Sr.	0	0	26	0	28,37',
'174	Quake	0	0	26	0	17,30,330',
'175	Ronin	1	0	26	0	92,48',
'176	Magneto (Age of Apocalypse)	1	0	27	0	87,11,390',
'177	Morph	0	0	27	0	23,29,350',
'178	Sabretooth & Wildchild	0	0	27	0	15,55,400',
'179	X-Man	0	0	27	0	20,34',
'180	Iron Lad	1	0	28	0	86,25,350',
'181	Nova (Frankie Raye)	0	0	28	103	31,43,400',
'182	Black Bolt	0	0	29	0	25,22,410',
'183	Crystal	0	0	29	0	83,44,420',
'184	Gorgon	0	0	29	0	84,37,375',
'185	Karnak	0	0	29	0	87,40',
'186	Lockjaw	0	0	29	0	35,49',
'187	Medusa	0	0	29	0	82,23,400',
'188	Triton	0	0	29	0	31,27,385',
'189	Gladiator	0	0	29	105	59,47,390',
'190	Doc Samson	0	0	30	0	63,34',
'191	Hercules	0	0	30	0	30,34,330',
'192	Hulkbuster Iron Man	2	0	30	0	69,49,400',
'193	Ares	0	0	30	106	13,42,400',
'194	Gladiator Hulk	0	0	30	107	53,27,450',
'195	Sentry	0	0	30	108	77,30,400',
'196	Agent Venom	0	0	31	0	4,50,400',
'197	Aurora	0	0	31	0	39,39',
'198	Black Knight	1	0	31	0	76,50',
'199	Captain America (Sam Wilson)	1	0	31	0	89,20,430',
'200	Captain Britain (Elizabeth Braddock)	1	0	31	0	17,31,330',
'201	Chamber	0	0	31	0	75,20,340',
'202	Ch\'od	0	0	31	0	84,42',
'203	Corsair	0	0	31	0	92,39',
'204	Cyborg Spider-Man	1	0	31	0	24,39,330',
'205	Cypher	0	0	31	0	24,30,350',
'206	Deathlok	0	0	31	0	25,31,360',
'207	Elsa Bloodstone	1	0	31	0	73,30',
'208	Ghost Rider (Johnny Blaze)	2	0	31	0	86,43,400',
'209	Havok (X-Factor)	0	0	31	0	75,34',
'210	Hepzibah	0	0	31	0	28,35,350',
'211	Husk	0	0	31	0	17,28,325',
'212	Kid Loki	0	0	31	0	12,31',
'213	Lilandra	0	0	31	0	92,34,365',
'214	M	0	0	31	0	20,22',
'215	Man-Thing	0	0	31	0	29,46',
'216	Meggan	0	0	31	0	10,32,365',
'217	Moon Girl & Devil Dinosaur	0	0	31	0	66,28,580',
'218	Patriot	1	0	31	0	65,28',
'219	Raza	0	0	31	0	22,40,350',
'220	Siryn	0	0	31	0	67,45,400',
'221	Songbird	0	0	31	0	22,42,400',
'222	Speed	0	0	31	0	30,36,330',
'223	Stature	1	0	31	0	69,18,285',
'224	Werewolf by Night	0	0	31	0	18,27,370',
'225	Wiccan	1	0	31	0	82,32,330',
'226	Wong	0	0	31	0	5,34,350',
'227	Daken	0	0	31	134	14,39',
'228	Darkchild	1	0	31	135	25,27,360',
'229	Darkstar	0	0	31	136	24,40,405',
'230	Moonstone	0	0	31	140	82,44,310',
'231	Red Guardian	0	0	31	136	25,35,310',
'232	Red Hulk	0	0	31	141	18,32,360',
'233	U.S.Agent	1	0	31	142	16,35',
'234	Ursa Major	0	0	31	136	34,39',
'235	White Widow	2	0	31	143	63,34'],
LOCATIONS: ['id	name	hasVillain	isHazardous	box',
'1	Avengers Mansion	0	0	2',
'2	Avengers Tower	0	0	2',
'3	Central Park	0	0	2',
'4	New York Police Headquarters	0	0	2',
'5	S.H.I.E.L.D. Headquarters	0	0	2',
'6	S.H.I.E.L.D. Helicarrier	0	0	2',
'7	Stark Labs	0	0	2',
'8	Times Square	0	0	2',
'9	Brooklyn Bridge	0	0	3',
'10	Daily Bugle	0	0	3',
'11	Midtown High School	0	0	3',
'12	Osborn Laboratories	0	0	3',
'13	Oscorp Tower	0	0	3',
'14	Queens	0	0	3',
'15	Collector\'s Museum	0	0	4',
'16	Knowhere	0	0	4',
'17	Kyln	0	0	4',
'18	Morag	0	0	4',
'19	The Milano	0	0	4',
'20	Xandar	0	0	4',
'21	Golden City	0	0	6',
'22	Great Mound	0	0	6',
'23	Jabari Village	0	0	6',
'24	Royal Palace	0	0	6',
'25	Shuri\'s Lab	0	0	6',
'26	Warrior Falls	0	0	6',
'27	Asgardian Palace	0	0	7',
'28	Bifrost Bridge	0	0	7',
'29	Heimdall\'s Observatory	0	0	7',
'30	Odin\'s Vault	0	0	7',
'31	Throne Room	0	0	7',
'32	Valhalla	0	0	7',
'33	Asgard	0	0	8',
'34	Avengers Mansion (Thanos Locations)	17	0	8',
'35	Hala	0	0	8',
'36	New York	0	0	8',
'37	Nidavellir	0	0	8',
'38	Quantum Tunnel (Thanos Locations)	17	0	8',
'39	Sanctuary (Thanos Locations)	17	0	8',
'40	Sanctum Sanctorum	0	0	8',
'41	Thano\'s Palace (Thanos Locations)	17	0	8',
'42	Titan (Thanos Locations)	17	0	8',
'43	Vormir	0	0	8',
'44	Wakanda Fields (Thanos Locations)	17	0	8',
'45	Asteroid M	0	0	10',
'46	Genosha	0	0	10',
'47	Hangar Bay	0	0	10',
'48	Muir Island (Mutant Research Center)	0	0	10',
'49	Xavier Institute For Higher Learning	0	0	10',
'50	X-Jet	0	0	10',
'51	Excalibur Lighthouse	0	0	11',
'52	Madripoor	0	0	11',
'53	Mojoverse	57	0	11',
'54	The Savage Land	0	0	11',
'55	Deadpool\'s Apartment	0	0	13',
'56	4 Yancy Street	0	0	14',
'57	Baxter Building	0	0	14',
'58	Latveria	38	1	14',
'59	Mount Wundagore	0	0	14',
'60	Cape Citadel	0	0	15',
'61	Island M	0	0	15',
'62	Xavier\'s School For Gifted Youngsters	0	0	15',
'63	Chandilar (Shi\'ar Empire)	0	0	16',
'64	Hellfire Club Building	0	0	16',
'65	Krakoa	0	0	16',
'66	Limbo	0	0	16',
'67	Apocalypse\'s Pyramid	47	1	18',
'68	Starlight Citadel	47	0	18',
'69	Adirondack Mountains	0	0	19',
'70	Morlock Tunnels	66	1	19',
'71	Murderworld	49	1	19',
'72	Stryfe\'s Secret Base	0	1	19',
'73	Marvel United Multiverse Location 1	0	0	21',
'74	Marvel United Multiverse Location 2	0	0	21',
'75	Marvel United Multiverse Location 3	0	0	21',
'76	Marvel United Multiverse Location 4	0	0	21',
'77	Marvel United Multiverse Location 5	0	0	21',
'78	Marvel United Multiverse Location 6	0	0	21',
'79	Marvel United Multiverse Location 7	0	0	21',
'80	Marvel United Multiverse Location 8	0	0	21',
'81	Great Weaver Temple	0	0	22',
'82	Horizon Labs	0	0	22',
'83	Japan	0	0	22',
'84	Las Vegas	0	0	22',
'85	Loomworld	73	0	22',
'86	Parker Residence	0	0	22',
'87	Sims Tower	73	0	22',
'88	Spider-Island	0	0	22',
'89	Arthros	0	0	23',
'90	Harvester of Sorrow	0	0	23',
'91	Kree-Lar	0	0	23',
'92	Nova Corps Headquarter	0	0	23',
'93	Avengers Mountain	0	0	24',
'94	Bar with no name	0	0	24',
'95	Garret Castle	0	0	24',
'96	Sokovia	0	0	24',
'97	The Raft	0	0	24',
'98	Washington D.C.	0	0	24',
'99	Bishop Publishing	0	0	25',
'100	Fisk Tower	0	0	25',
'101	Hell\'s Kitchen	0	0	25',
'102	Statue of Liberty	0	0	25',
'103	Camp Hammond	0	0	26',
'104	Mount Rushmore	0	0	26',
'105	San Francisco	0	0	26',
'106	The Peak VII	0	0	26',
'107	Avalon	0	0	27',
'108	Dark Beast Laboratory	0	0	27',
'109	Human High Council Base	0	0	27',
'110	The Core (Seattle Slave Camp)	0	0	27',
'111	Africa	0	0	28',
'112	Asia	0	0	28',
'113	Europe	0	0	28',
'114	North America	0	0	28',
'115	South America	0	0	28',
'116	Oceania	0	0	28',
'117	Attilan	0	0	29',
'118	Blue Area of the Moon	0	0	29',
'119	Tarnax IV	0	0	29',
'120	Watcher Citadel	0	0	29',
'121	Battleworld	0	0	30',
'122	New York City Arena	0	0	30',
'123	Sakaar	0	0	30',
'124	Monster Isle	0	0	31',
'125	Valley Of The Sleeping Dragon	0	0	31'],
MODES: ['id	name	code	players	teams	teamISize	teamIISize	villains	superVillainMode',
'1	S.H.I.E.L.D./Xavier	SX	1	1	3	0	1	0',
'2	Commander	C	1	1	5	0	1	0',
'3	Sinister Six (S.H.I.E.L.D./Xavier)	SS(SX)	1	1	3	0	6	0',
'4	Sinister Six (Commander)	SS(C)	1	1	5	0	6	0',
'5	Dark Avengers (S.H.I.E.L.D./Xavier)	DA(SX)	1	1	3	0	3	0',
'6	Dark Avengers (Commander)	DA(C)	1	1	5	0	3	0',
'7	Heralds of Galactus (S.H.I.E.L.D./Xavier)	HoG(SX)	1	1	3	0	4	0',
'8	Heralds of Galactus (Commander)	HoG(C)	1	1	5	0	4	0',
'9	Normal	N	2	1	2	0	1	0',
'10	S.H.I.E.L.D./Xavier with Super Villain Mode	SXwSP	2	1	3	0	1	1',
'11	Commander with Super Villain Mode	CwSP	2	1	5	0	1	1',
'12	Sinister Six (Normal)	SS	2	1	2	0	6	0',
'13	Team vs Team (S.H.I.E.L.D./Xavier)	TvT(SXvSX)	2	2	3	3	1	0',
'14	Team vs Team (Commander)	TvT(CvC)	2	2	5	5	1	0',
'15	Team vs Team (Commander vs S.H.I.E.L.D./Xavier)	TvT(CvSX)	2	2	5	3	1	0',
'16	Dark Avengers (Normal)	DA(N)	2	1	2	0	3	0',
'17	Registration Clash (S.H.I.E.L.D./Xavier)	RC(SXvSX)	2	2	3	3	0	0',
'18	Registration Clash (Commander)	RC(CvC)	2	2	5	5	0	0',
'19	Clash of Heroes (S.H.I.E.L.D./Xavier)	CoH(SXvSX)	2	2	3	3	0	0',
'20	Clash of Heroes (Commander)	CoH(CvC)	2	2	5	5	0	0',
'21	Heralds of Galactus (Normal)	HoG(N)	2	1	2	0	4	0',
'22	Normal	N	3	1	3	0	1	0',
'23	Sinister Six (Normal)	SS(N)	3	1	3	0	6	0',
'24	Team vs Team (S.H.I.E.L.D./Xavier) with Super Villain Mode	TvT(SXvSX)wSP	3	2	3	3	1	1',
'25	Team vs Team (Commander) with Super Villain Mode	TvT(CvC)wSP	3	2	5	5	1	1',
'26	Team vs Team (Commander vs S.H.I.E.L.D./Xavier) with Super Villain Mode	TvT(CvSX)wSP	3	2	5	3	1	1',
'27	Dark Avengers (Normal)	DA(N)	3	1	3	0	3	0',
'28	Heralds of Galactus (Normal)	HoG(N)	3	1	3	0	4	0',
'29	Team vs Team (Normal vs S.H.I.E.L.D./Xavier)	TvT(NvSX)	3	2	2	3	1	0',
'30	Team vs Team (Normal vs Commander)	TvT(NvC)	3	2	2	5	1	0',
'31	Registration Clash (Normal vs Commander)	RC(NvC)	3	2	2	5	0	0',
'32	Clash of Heroes (Normal vs Commander)	CoH(NvC)	3	2	2	5	0	0',
'33	Registration Clash (Normal vs S.H.I.E.L.D./Xavier)	RC(NvSX)	3	2	2	3	0	0',
'34	Clash of Heroes (Normal vs S.H.I.E.L.D./Xavier)	CoH(NvSX)	3	2	2	3	0	0',
'35	Normal	N	4	1	4	0	1	0',
'36	Sinister Six (Normal)	SS(N)	4	1	4	0	6	0',
'37	Team vs Team (Normal)	TvT(NvN)	4	2	2	2	1	0',
'38	Team vs Team (Normal vs S.H.I.E.L.D./Xavier)	TvT(NvSX)	4	2	3	3	1	0',
'39	Team vs Team (Normal vs Commander)	TvT(NvC)	4	2	3	5	1	0',
'40	Dark Avengers (Normal)	DA(N)	4	1	4	0	3	0',
'41	Registration Clash (Normal)	RC(NvN)	4	2	2	2	0	0',
'42	Clash of Heroes (Normal)	CoH(NvN)	4	2	2	2	0	0',
'43	Heralds of Galactus (Normal)	HoG(N)	4	1	4	0	4	0',
'44	Registration Clash (Normal vs S.H.I.E.L.D./Xavier)	RC(NvSX)	4	2	3	3	0	0',
'45	Clash of Heroes (Normal vs S.H.I.E.L.D./Xavier)	CoH(NvSX)	4	2	3	3	0	0',
'46	Team vs Team (Normal vs S.H.I.E.L.D./Xavier) with Super Villain Mode	TvT(NvSX)wSP	4	2	2	3	1	1',
'47	Team vs Team (Normal vs Commander) with Super Villain Mode	TvT(NvC)wSP	4	2	2	5	1	1',
'48	Registration Clash (Normal vs Commander)	RC(NvC)	4	2	3	5	0	0',
'49	Clash of Heroes (Normal vs Commander)	CoH(NvC)	4	2	3	5	0	0',
'50	Normal with Super Villain Mode	NwSP	5	1	4	0	1	1',
'51	Team vs Team (Normal) with Super Villain Mode	TvT(NvN)wSP	5	2	2	2	1	1',
'52	Team vs Team (Normal vs S.H.I.E.L.D./Xavier) with Super Villain Mode	TvT(NvSX)wSP	5	2	3	3	1	1',
'53	Team vs Team (Normal vs Commander) with Super Villain Mode	TvT(NvC)wSP	5	2	3	5	1	1',
'54	Team vs Team (Normal)	TvT(NvN)	5	2	2	3	1	0',
'55	Registration Clash (Normal)	RC(NvN)	5	2	2	3	0	0',
'56	Clash of Heroes (Normal)	CoH(NvN)	5	2	2	3	0	0',
'57	Team vs Team (Normal)	TvT(NvN)	6	2	3	3	1	0',
'58	Registration Clash (Normal)	RC(NvN)	6	2	3	3	0	0',
'59	Clash of Heroes (Normal)	CoH(NvN)	6	2	3	3	0	0',
'60	Team vs Team (Normal) with Super Villain Mode	TvT(NvN)wSP	6	2	2	3	1	1',
'61	Team vs Team (Normal) with Super Villain Mode	TvT(NvN)wSP	7	2	3	3	1	1'],
OTHERS: [
'id	name	box	position',
'1	Deadpool (Challenge)	13	25,27,320',
'2	Sentinel	12	76,5,420',
'3	Carnage (Challenge)	25	16,58,400'],
TEAMS: ['id	name',
'1	United Heroes',
'2	Avengers',
'3	New Avengers',
'4	X-Men',
'5	Uncanny X-Force',
'6	Defenders',
'7	A-Force',
'8	Guardians of The Galaxy',
'9	Deadpool Team-Up',
'10	Asgadians & Allies',
'11	Spider-Army',
'12	Champions',
'13	Wakandans',
'14	Team Iron Man Pro-Registration',
'15	Team Captain America Secret Avengers',
'16	X-Force',
'17	West Coast Avengers',
'18	Savage Avengers',
'19	Resistance Against Apocalypse',
'20	Illuminati',
'21	X-Factor',
'22	Excalibur',
'23	New Mutants',
'24	Infinity Watch',
'25	Inhumans',
'26	Fantastic Four',
'27	Force Works',
'28	Defenders (Manhattan)',
'29	Marvel Knights',
'30	Alpha Flight',
'31	Starjammers',
'32	Gen-X',
'33	Young Avengers',
'34	Swordbearers of Krakoa',
'35	S.H.I.E.L.D.',
'36	Dark Avengers',
'37	Midnight Sons',
'38	Red Hulk\'s Thunderbolts'],
VILLAINS: ['id	name	superVillain	teamVsTeam	sinisterSix	heraldsOfGalactus	darkAvengers	phoenixFive	isAntiHero	members	box	position',
'1	Red Skull	1	1	0	1	0	0	0	0	2	18,16,350',
'2	Taskmaster	1	1	0	1	0	0	0	0	2	28,53,380',
'3	Ultron	1	1	0	1	0	0	0	0	2	18,25,330',
'4	Green Goblin	1	1	1	1	0	0	0	0	3	28,30,295',
'5	Ronan	1	1	0	1	0	0	0	0	4	89,28,330',
'6	Doctor Octopus	1	1	1	1	0	0	0	0	5	19,44,390',
'7	Electro	0	1	1	1	0	0	0	0	5	20,29,330',
'8	Kraven	1	1	1	1	0	0	0	0	5	44,59,380',
'9	Mysterio	1	1	1	1	0	0	0	0	5	90,19',
'10	Sandman	1	1	1	1	0	0	0	0	5	76,29,500',
'11	Vulture	1	1	1	1	0	0	0	0	5	69,54',
'12	Killmonger	1	1	0	1	0	0	0	0	6	82,43',
'13	Loki	1	1	0	1	0	0	0	0	7	91,34',
'14	Black Dwarf	1	1	0	1	0	0	0	0	8	69,49,400',
'15	Ebony Maw	1	1	0	1	0	0	0	0	8	18,30,350',
'16	Proxima Midnight	1	1	0	1	0	0	0	0	8	15,62,330',
'17	Thanos	1	1	0	1	0	0	0	0	8	10,15,350',
'18	Baron Zemo	1	1	0	1	0	0	0	0	9	19,46,375',
'19	Bullseye	1	1	0	1	1	0	0	0	9	89,24',
'20	Carnage	1	1	1	1	0	0	0	0	9	25,39,280',
'21	Corvus Glaive	1	1	0	1	0	0	0	0	9	28,42,340',
'22	Dormammu	1	0	0	1	0	0	0	0	9	19,34',
'23	Hela	1	0	0	1	0	0	0	0	9	20,36,335',
'24	Kang	0	1	0	1	0	0	0	0	9	25,16,435',
'25	Kingpin	1	1	0	1	0	0	0	0	9	81,18,350',
'26	M.O.D.O.K.	1	1	0	1	0	0	0	0	9	90,35,250',
'27	Rhino	1	1	1	1	0	0	0	0	9	26,32',
'28	Venom (Villain)	1	1	1	1	0	0	0	0	9	65,54',
'29	Sabretooth	1	1	0	1	0	0	0	0	10	72,27,330',
'30	Juggernaut	1	1	0	1	0	0	1	0	10	20,41',
'31	Magneto	1	1	0	1	0	0	1	0	10	17,26,430',
'32	Mystique	1	0	0	1	0	0	1	0	10	37,36',
'33	Mister Sinister	1	1	0	1	0	0	1	0	11	22,33,400',
'34	Nimrod	1	0	0	0	0	0	0	0	12	63,19,400',
'35	Deadpool (Villian)	0	1	0	0	0	0	0	0	13	49,48,320',
'36	Bob, Agent of Hydra	1	1	0	1	0	0	1	0	13	84,32',
'37	Super-Skrull	1	1	0	1	0	0	0	0	14	33,22,340',
'38	Doctor Doom	1	1	0	1	0	0	1	0	14	21,23,390',
'39	Scarlet Witch & Quicksilver	1	1	0	1	0	0	0	40,41	15	50,50,100',
'40	Scarlet Witch (Villian)	0	0	0	0	0	0	0	-1	15	16,25',
'41	Quicksilver (Villian)	0	0	0	0	0	0	0	-1	15	73,36,290',
'42	Sebastian Shaw	1	1	0	1	0	0	0	0	16	18,26,360',
'43	Colossus (Phoenix Five)	1	1	0	1	0	1	0	0	17	21,23,400',
'44	Cyclops (Phoenix Five)	1	1	0	1	0	1	0	0	17	32,32,330',
'45	Emma Frost (Phoenix Five)	1	1	0	1	0	1	0	0	17	19,31,400',
'46	Magik (Phoenix Five)	1	1	0	1	0	1	0	0	17	86,33,350',
'47	Namor (Phoenix Five)	1	1	0	1	0	1	0	0	17	79,29,340',
'48	The Horsemen of the Apocalypse	0	0	0	0	0	0	0	49,50,51,52	18	50,50,100',
'49	Famine	0	0	0	0	0	0	0	-1	18	23,19,470',
'50	War	0	0	0	0	0	0	0	-1	18	30,22,400',
'51	Pestilence	0	0	0	0	0	0	0	-1	18	25,31,400',
'52	Death	0	0	0	0	0	0	0	-1	18	20,39,400',
'53	Apocalypse	1	0	0	1	0	0	1	0	18	24,20,380',
'54	Stryfe	1	1	0	1	0	0	0	0	19	81,36,410',
'55	Arcade	1	1	0	1	0	0	0	0	20	34,33,370',
'56	Avalanche	1	1	0	1	0	0	0	0	20	27,31',
'57	Brood Queen	1	1	0	1	0	0	0	0	20	68,49,350',
'58	Callisto	1	1	0	1	0	0	0	0	20	68,42',
'59	Dark Phoenix	1	0	0	1	0	0	0	0	20	27,50,500',
'60	Deathbird	1	1	0	1	0	0	0	0	20	27,45,330',
'61	Lady Deathstrike	1	0	0	1	0	0	0	0	20	39,50,290',
'62	Mastermind	1	1	0	1	0	0	0	0	20	18,26',
'63	Mojo	1	1	0	1	0	0	0	0	20	67,40,350',
'64	Omega Red	1	1	0	1	0	0	0	0	20	75,31,300',
'65	Onslaught	1	1	0	1	0	0	0	0	20	24,28,350',
'66	Sauron	1	1	0	1	0	0	0	0	20	78,53',
'67	Shadow King	1	1	0	1	0	0	0	0	20	80,31,350',
'68	Silver Samurai	1	1	0	1	0	0	0	0	20	23,39',
'69	Toad, Blob & Pyro	1	1	0	1	0	0	0	70,71,72	20	50,50,100',
'70	Toad	0	0	0	0	0	0	0	-1	20	67,71,320',
'71	Blob	0	0	0	0	0	0	0	-1	20	32,40,450',
'72	Pyro	0	0	0	0	0	0	0	-1	20	84,44',
'73	Emma Frost	1	1	0	1	0	0	1	0	20	25,29,340',
'74	Legion	0	0	0	1	0	0	1	0	20	73,60,330',
'75	Marrow	1	1	0	1	0	0	1	0	20	77,39,350',
'76	Namor	1	1	0	1	0	0	1	0	20	33,26,360',
'77	Spiral	1	1	0	1	0	0	1	0	20	28,40',
'78	Emperor Doom	1	1	0	1	0	0	0	0	21	24,32,450',
'79	Immortus	1	1	0	1	0	0	0	0	21	17,20,450',
'80	Maestro	1	1	0	1	0	0	0	0	21	30,32,370',
'81	Cosmic Ghost Rider	1	1	0	1	0	0	1	0	21	15,31,350',
'82	Morlun	1	1	1	1	0	0	0	0	22	26,29,330',
'83	Spot	1	1	1	1	0	0	0	0	22	83,45,300',
'84	Anti-Venom	1	1	0	1	0	0	1	0	22	27,44',
'85	Superior Spider-Man	1	1	0	1	0	0	1	0	22	76,60,500',
'86	Annihilus	1	1	0	1	0	0	0	0	23	65,45',
'87	Demogoblin & Doppelganger	1	1	0	1	0	0	0	88,89	25	50,50,100',
'88	Demogoblin	0	0	1	0	0	0	0	-1	25	11,48,330',
'89	Doppelganger	0	0	1	0	0	0	0	-1	25	33,41',
'90	Scorpion	1	1	1	1	0	0	0	0	25	29,47,330',
'91	Scream	1	1	1	1	0	0	0	0	25	66,46,290',
'92	Shriek	1	1	1	1	0	0	0	0	25	69,45,340',
'93	Queen Veranke	1	1	0	1	0	0	0	0	26	81,29,400',
'94	Skrulls	1	1	0	1	0	0	0	0	26	29,50',
'95	Morbius	1	1	1	1	0	0	1	0	25	64,34',
'96	Apocalypse (Age of Apocalypse)	1	1	0	1	0	0	0	0	27	31,14,440',
'97	Dark Beast	1	1	0	0	0	0	0	0	27	39,34',
'98	Nemesis	1	1	0	1	0	0	0	0	27	13,36,440',
'99	Air-Walker	1	1	0	1	0	0	0	0	28	20,29,450',
'100	Firelord	1	1	0	1	0	0	0	0	28	84,34,500',
'101	Galactus	1	1	0	0	0	0	0	0	28	20,24,400',
'102	Terrax	1	1	0	1	0	0	0	0	28	22,40,400',
'103	Nova (Frankie Raye)	1	1	0	1	0	0	1	0	28	31,43,400',
'104	Vulcan	1	1	0	1	0	0	0	0	29	75,47,270',
'105	Gladiator	1	1	0	1	0	0	1	0	29	59,47,390',
'106	Ares	1	1	0	1	1	0	1	0	30	13,42,400',
'107	Gladiator Hulk	1	1	0	1	0	0	1	0	30	53,27,450',
'108	Sentry	1	1	0	1	1	0	1	0	30	77,30,400',
'109	Abomination	1	1	0	1	0	0	0	0	31	25,50',
'110	Absorbing Man	1	1	0	1	0	0	0	0	31	73,33,375',
'111	Blastaar	1	1	0	1	0	0	0	0	31	28,40',
'112	Chameleon	1	1	1	1	0	0	0	0	31	71,39,290',
'113	Crimson Dynamo	1	1	0	1	0	0	0	0	31	4,33',
'114	Crossbones	1	1	0	1	0	0	0	0	31	22,33,300',
'115	Enchantress	1	1	0	1	0	0	0	0	31	27,31',
'116	Fin Fang Foom	1	1	0	1	0	0	0	0	31	71,52,265',
'117	Gorr	1	1	0	1	0	0	0	0	31	22,40,485',
'118	High Evolutionary	1	1	0	1	0	0	0	0	31	15,22',
'119	Hobgoblin	1	1	1	1	0	0	0	0	31	25,31',
'120	Iron Patriot	1	1	0	1	0	0	0	0	31	15,25,350',
'121	Klaw	1	1	0	1	0	0	0	0	31	81,35,380',
'122	Knull	1	1	0	1	0	0	0	0	31	81,19,450',
'123	Lizard	1	1	1	1	0	0	0	0	31	31,32',
'124	Maximus	1	1	0	1	0	0	0	0	31	78,31,350',
'125	Mole Man	1	1	0	1	0	0	0	0	31	23,48,370',
'126	Purple Man	1	1	0	1	0	0	0	0	31	13,16',
'127	Shocker	1	1	1	1	0	0	0	0	31	96,35,290',
'128	Titania	1	1	0	1	0	0	0	0	31	70,52,330',
'129	Wrecking Crew	1	1	0	0	0	0	0	130,131,132,133	31	50,50,100',
'130	Bulldozer	0	0	0	0	0	0	0	-1	31	65,39,350',
'131	Thunderball	0	0	0	0	0	0	0	-1	31	15,28,340',
'132	Piledriver	0	0	0	0	0	0	0	-1	31	82,33',
'133	Wrecker	0	0	0	0	0	0	0	-1	31	21,24,430',
'134	Daken	1	1	0	1	1	0	1	0	31	14,39',
'135	Darkchild	1	1	0	1	0	0	1	0	31	25,27,360',
'136	Darkstar, Red Guardian & Ursa Major	1	1	0	1	0	0	1	137,138,139	31	50,50,100',
'137	Darkstar	0	0	0	0	0	0	1	-1	31	24,40,405',
'138	Red Guardian	0	0	0	0	0	0	1	-1	31	25,35,310',
'139	Ursa Major	0	0	0	0	0	0	1	-1	31	34,39',
'140	Moonstone	1	1	0	1	1	0	1	0	31	82,44,310',
'141	Red Hulk	1	1	0	1	0	0	1	0	31	18,32,360',
'142	U.S.Agent	1	1	0	1	1	0	1	0	31	16,35',
'143	White Widow	1	1	0	1	0	0	1	0	31	63,34'],
RELCHALLENGEBOX: ['id	challenge	box',
'1	1	2',
'2	3	2',
'3	5	2',
'4	8	3',
'5	12	4',
'6	7	6',
'7	13	7',
'8	2	10',
'9	4	10',
'10	6	10',
'11	14	11',
'12	15	12',
'13	16	12',
'14	17	12',
'15	11	14',
'16	14	16',
'17	9	19',
'18	2	21',
'19	4	21',
'20	6	21',
'21	2	22',
'22	4	22',
'23	19	25',
'24	20	26',
'25	21	23'],
RELTEAMSHEROES: ['id	team	hero',
'1	2	3',
'2	2	4',
'3	2	5',
'4	2	6',
'5	2	7',
'6	2	8',
'7	2	9',
'8	2	20',
'9	2	23',
'10	2	33',
'11	2	35',
'12	2	49',
'13	2	50',
'14	2	52',
'15	2	110',
'16	2	198',
'17	2	199',
'18	2	191',
'19	3	5',
'20	3	8',
'21	3	13',
'22	3	65',
'23	3	39',
'24	3	55',
'25	3	54',
'26	3	83',
'27	3	75',
'28	3	134',
'29	3	175',
'30	3	195',
'31	4	60',
'32	4	61',
'33	4	62',
'34	4	63',
'35	4	64',
'36	4	65',
'37	4	70',
'38	4	71',
'39	4	72',
'40	4	73',
'41	4	90',
'42	4	91',
'43	4	92',
'44	4	94',
'45	4	69',
'46	4	93',
'47	4	85',
'48	4	75',
'49	4	101',
'50	4	106',
'51	4	110',
'52	4	112',
'53	4	115',
'54	4	119',
'55	4	123',
'56	4	130',
'57	4	134',
'58	4	67',
'59	4	68',
'60	4	137',
'61	4	139',
'62	5	65',
'63	5	72',
'64	5	90',
'65	5	76',
'66	5	75',
'67	5	134',
'68	5	108',
'69	5	136',
'70	5	206',
'71	5	141',
'72	6	7',
'73	6	18',
'74	6	24',
'75	6	60',
'76	6	29',
'77	6	30',
'78	6	36',
'79	6	59',
'80	6	81',
'81	6	82',
'82	6	117',
'83	6	198',
'84	6	207',
'85	6	208',
'86	6	158',
'87	6	140',
'88	6	233',
'89	7	6',
'90	7	146',
'91	7	52',
'92	7	26',
'93	7	54',
'94	7	55',
'95	7	106',
'96	7	187',
'97	7	223',
'98	7	167',
'99	7	166',
'100	8	17',
'101	8	16',
'102	8	15',
'103	8	14',
'104	8	25',
'105	8	31',
'106	8	40',
'107	8	44',
'108	8	158',
'109	8	160',
'110	8	159',
'111	8	148',
'112	8	189',
'113	9	65',
'114	9	76',
'115	9	77',
'116	9	97',
'117	9	99',
'118	9	207',
'119	9	78',
'120	10	23',
'121	10	22',
'122	10	24',
'123	10	145',
'124	10	146',
'125	10	21',
'126	11	13',
'127	11	11',
'128	11	10',
'129	11	53',
'130	11	149',
'131	11	150',
'132	11	151',
'133	11	152',
'134	11	153',
'135	11	154',
'136	11	12',
'137	11	27',
'138	11	54',
'139	11	56',
'140	11	204',
'141	11	196',
'142	11	156',
'143	12	4',
'144	12	11',
'145	12	144',
'146	12	151',
'147	12	43',
'148	12	46',
'149	12	85',
'150	12	88',
'151	12	218',
'152	12	208',
'153	12	191',
'154	13	18',
'155	13	19',
'156	13	20',
'157	13	142',
'158	13	47',
'159	14	4',
'160	14	9',
'161	14	91',
'162	14	76',
'163	14	164',
'164	14	168',
'165	14	169',
'166	14	170',
'167	14	165',
'168	14	28',
'169	14	52',
'170	14	81',
'171	14	221',
'172	14	190',
'173	14	195',
'174	15	18',
'175	15	64',
'176	15	161',
'177	15	162',
'178	15	166',
'179	15	167',
'180	15	163',
'181	15	29',
'182	15	33',
'183	15	39',
'184	15	48',
'185	15	54',
'186	15	57',
'187	15	79',
'188	15	80',
'189	15	104',
'190	15	105',
'191	15	225',
'192	15	191',
'193	16	97',
'194	16	98',
'195	16	99',
'196	16	100',
'197	16	102',
'198	16	107',
'199	16	109',
'200	16	131',
'201	16	133',
'202	16	95',
'203	16	76',
'204	16	220',
'205	17	35',
'206	17	41',
'207	17	50',
'208	17	57',
'209	17	58',
'210	17	8',
'211	17	168',
'212	17	169',
'213	18	30',
'214	18	32',
'215	18	29',
'216	18	34',
'217	18	75',
'218	18	116',
'219	18	134',
'220	18	198',
'221	18	4',
'222	18	65',
'223	18	208',
'224	18	84',
'225	18	66',
'226	18	228',
'227	19	176',
'228	19	177',
'229	19	178',
'230	19	179',
'231	19	91',
'232	19	101',
'233	20	30',
'234	20	81',
'235	20	182',
'236	20	8',
'237	20	18',
'238	20	63',
'239	20	140',
'240	21	49',
'241	21	93',
'242	21	118',
'243	21	124',
'244	21	129',
'245	21	135',
'246	21	209',
'247	22	103',
'248	22	114',
'249	22	119',
'250	22	122',
'251	22	200',
'252	22	92',
'253	22	216',
'254	23	98',
'255	23	116',
'256	23	117',
'257	23	131',
'258	23	132',
'259	23	135',
'260	23	179',
'261	23	205',
'262	23	138',
'263	23	228',
'264	24	25',
'265	24	30',
'266	24	31',
'267	24	14',
'268	24	4',
'269	24	6',
'270	24	17',
'271	24	157',
'272	25	182',
'273	25	187',
'274	25	186',
'275	25	183',
'276	25	185',
'277	25	184',
'278	25	188',
'279	25	43',
'280	25	217',
'281	26	79',
'282	26	80',
'283	26	81',
'284	26	83',
'285	27	41',
'286	27	50',
'287	27	54',
'288	27	58',
'289	27	8',
'290	27	169',
'291	27	172',
'292	27	174',
'293	27	233',
'294	28	29',
'295	28	37',
'296	28	38',
'297	28	39',
'298	29	29',
'299	29	39',
'300	29	42',
'301	29	51',
'302	29	105',
'303	29	4',
'304	30	111',
'305	30	120',
'306	30	125',
'307	30	126',
'308	30	127',
'309	30	197',
'310	30	65',
'311	31	202',
'312	31	203',
'313	31	210',
'314	31	219',
'315	31	113',
'316	31	124',
'317	31	213',
'318	32	201',
'319	32	211',
'320	32	214',
'321	32	69',
'322	32	71',
'323	32	137',
'324	33	180',
'325	33	218',
'326	33	222',
'327	33	212',
'328	33	225',
'329	33	163',
'330	33	166',
'331	33	26',
'332	33	223',
'333	34	200',
'334	34	205',
'335	34	97',
'336	34	75',
'337	34	103',
'338	34	116',
'339	34	134',
'340	34	64',
'341	34	65',
'342	34	96',
'343	34	228',
'344	35	199',
'345	35	221',
'346	35	33',
'347	35	41',
'348	35	45',
'349	35	54',
'350	35	58',
'351	35	117',
'352	35	173',
'353	35	172',
'354	35	174',
'355	35	4',
'356	35	143',
'357	35	196',
'358	35	233',
'359	35	235',
'360	36	221',
'361	36	227',
'362	36	233',
'363	36	195',
'364	36	193',
'365	36	230',
'366	37	207',
'367	37	208',
'368	37	215',
'369	37	169',
'370	37	28',
'371	37	42',
'372	37	37',
'373	37	30',
'374	37	224',
'375	37	228',
'376	37	171',
'377	38	196',
'378	38	208',
'379	38	32',
'380	38	48',
'381	38	76',
'382	38	232']
};
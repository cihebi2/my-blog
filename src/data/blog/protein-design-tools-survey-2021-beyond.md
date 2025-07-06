---
title: "2021年以来蛋白质设计领域非商业化开源工具研究进展报告"
description: "全面综述2021年以来蛋白质设计领域涌现的重要非商业化开源工具，重点介绍基于AI和深度学习的最新进展及其在科研中的应用。"
pubDatetime: 2025-07-03T09:30:00Z
tags: ["蛋白质设计", "开源工具", "AI", "深度学习", "生物信息学", "计算生物学"]
featured: true
---
## I. 现代计算蛋白质设计导论

### A. 蛋白质工程的演进格局

**计算蛋白质设计 (Computational Protein Design, CPD) 作为一个旨在创造具有特定结构和功能的新型蛋白质的领域，经历了显著的演变。历史上，蛋白质工程主要依赖于对现有蛋白质进行改造。然而，近年来，该领域正经历一场范式转变，逐渐走向“从头设计” (de novo design)——即从基本原理出发，创造自然界中不存在的、具有复杂结构和功能的蛋白质。这一转变在很大程度上得益于近期计算方法的突破。**

**人工智能 (AI)，特别是深度学习 (DL) 和生成模型，在推动CPD革命中扮演了核心角色。这些方法通过利用海量的蛋白质序列和结构数据库，实现了前所未有的设计能力。AI与生物学的融合并非简单的技术叠加，而是代表了蛋白质设计方法的根本性变革。例如，RFdiffusion等工具的设计灵感来源于AI图像生成器，展示了AI范式在解决复杂生物学问题上的强大潜力。ProteinMPNN则运用了稳健的深度学习方法进行序列设计。这种趋势表明，成功的AI/ML架构（如图神经网络、Transformer、扩散模型）正被迅速应用于蛋白质特异性任务。大量生物数据（如UniProt的序列数据和PDB及AlphaFoldDB的结构数据）的积累，为这些数据驱动的AI模型的开发提供了燃料。这种融合意味着AI领域的突破可以迅速转化为生物发现的强大新工具，加速蛋白质工程领域的创新步伐，同时也对未来蛋白质设计者提出了生物学和数据科学双重技能的要求。**

**更值得注意的是，蛋白质科学领域已经从主要关注“根据序列预测结构”（如早期的AlphaFold和RoseTTAFold）发展到能够“生成具有期望特性的新序列和结构”（如ProteinMPNN、RFdiffusion和Protpardelle）。结构预测工具通常作为设计流程的基础或组成部分。例如，ProteinMPNN常与RFdiffusion结合使用，而EvoPro则利用DL模型进行结构预测和序列优化。这一进步是合乎逻辑的，即从理解现有蛋白质（预测）到创造新蛋白质（设计）。高精度的结构预测能力（如AlphaFold2）是这一转变的关键推动因素，它们不仅为设计提供了高质量的结构模板，也为评估设计序列的合理性（通过预测其折叠）提供了手段，并为训练新的生成模型提供了大量的预测结构数据。这意味着研究重心正从理解“已存在什么”转向积极创造“可能存在什么”，为设计具有全新功能的蛋白质、针对“不可成药”靶点的结合剂以及定制生物材料开辟了道路。**

### B. 开源工具的重要性

**开源工具在推动蛋白质设计领域的发展中扮演着至关重要的角色。它们使得先进的蛋白质设计能力不再局限于少数专业实验室，从而实现了技术的普及化。社区驱动的开发和验证模式加速了该领域的进展，促进了知识共享和技术迭代。正如本报告用户所关注的，非商业化工具对于广泛的学术研究和创新尤为关键，它们为科研人员提供了自由探索和不受商业限制的平台。**

### C. 本报告的范围与目标

**本报告旨在全面调研2021年以后发表的、获得广泛认可且非商业化的蛋白质设计工具，以及蛋白质设计流程中不可或缺的辅助工具。报告将详细阐述这些工具的应用场景和使用方法，为相关领域的研究人员提供一份实用的参考指南。**

## II. 广泛认可的蛋白质设计工具（2021年后，非商业化）

**本节将详细介绍主要用于生成新蛋白质序列或结构，或执行特定设计任务（如结合剂设计、D-肽设计）的核心工具。**

**表1：核心蛋白质设计工具概览（2021年后，非商业化）**

| **工具名称**             | **主要功能**                    | **核心创新/原理**                              | **主要应用领域**                                                    | **可用性 (GitHub/Web服务器)**                             | **主要出版物 (年份, 期刊)**                                                               |
| ------------------------------ | ------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **ProteinMPNN**          | **序列设计**                    | **图神经网络 (GNN)**                           | **从头设计、蛋白质重设计、序列库生成**                              | **GitHub: dauparas/ProteinMPNN, Kuhlman-Lab/proteinmpnn** | **Dauparas J, et al.** *Science* **, 2022**                                       |
| **LigandMPNN**           | **配体结合位点序列设计**        | **GNN，显式建模配体环境**                      | **酶设计、传感器设计、药物相互作用位点设计、核酸/金属结合蛋白设计** | **GitHub: dauparas/LigandMPNN**                           | **Dauparas J, et al.** *Nature Methods* **, 2025 (预计) /***bioRxiv*2023.12.22.573103 |
| **ProtFlow**             | **序列设计**                    | **流匹配 (Flow Matching)，压缩pLM嵌入**        | **多肽、长链蛋白、抗菌肽、抗体从头设计**                            | **论文描述，代码状态需查证 (arXiv:2504.10983)**           | **Kong Z, et al.** *arXiv:2504.10983* **, 2025**                                  |
| **TIMED**                | **序列设计 (逆向折叠)**         | **卷积神经网络 (CNN)**                         | **目标骨架的序列设计**                                              | **Web工具: pragmaticproteindesign.bio.ed.ac.uk/timed**    | **Castorina LV, et al.** *Protein Eng Des Sel* **, 2024**                         |
| **RFdiffusion**          | **结构生成 (从头)**             | **扩散模型 (Diffusion Model)**                 | **新型折叠设计、功能基序骨架化、对称寡聚体设计、结合剂设计**        | **GitHub: RosettaCommons/RFdiffusion, Google Colab**      | **Watson JL, et al.** *Nature* **, 2023**                                         |
| **RFdiffusion All-Atom** | **结构生成 (从头, 全原子)**     | **扩散模型，处理蛋白质、核酸、小分子、离子**   | **蛋白质-核酸/小分子复合物设计、复杂生物分子组装体设计**            | **GitHub: baker-laboratory/rf_diffusion_all_atom**        | **Krishna R, et al.** *Science* **, 2024 (关联文献)**                             |
| **Protpardelle**         | **结构与序列协同生成 (全原子)** | **扩散模型，“叠加态”侧链表示**               | **从头全原子设计、功能基序骨架化（无骨架和旋转异构体限制）**        | **GitHub: ProteinDesignLab/protpardelle**                 | **Chu AE, et al.** *PNAS* **, 2024**                                              |
| **EvoPro**               | **结合剂优化**                  | **遗传算法，集成AF2和ProteinMPNN，多状态设计** | **新型蛋白质结合剂设计、亲和力/特异性优化、抗体工程**               | **GitHub: Kuhlman-Lab/evopro**                            | **Goudy OJ, et al.***bioRxiv*(预印本)                                                         |
| **DexDesign (OSPREY)**   | **D-肽抑制剂设计**              | **OSPREY框架 (DEE/A*, K*)，针对D-肽的特定算法**  | **治疗性D-肽抑制剂设计，特别适用于需要蛋白酶解稳定性的靶点**        | **GitHub: donaldlab/OSPREY (OSPREY内实现)**               | **Guerin et al. 2024 /***Protein Science*2024 (推测) / PMC11099876                            |
| **PepPrCLIP**            | **肽结合剂设计**                | **生成算法 (PepPr) + CLIP筛选，基于序列**      | **针对“不可成药”靶点（尤其是无序蛋白）的治疗性肽设计**            | **Hugging Face: ubiquitx/pepprclip (Colab notebook)**     | **Bhat S, et al.** *Sci Adv* **, 2025**                                           |

### A. 序列设计工具 (逆向折叠)

**这些工具以蛋白质骨架结构为输入，设计出可能折叠成该结构的氨基酸序列，通常被称为“逆向折叠问题”。**

#### 1. ProteinMPNN

* **概述:** ProteinMPNN 是一种基于深度学习的稳健工具，用于快速蛋白质序列设计。它由华盛顿大学蛋白质设计研究所 (IPD, David Baker实验室) 开发。
* **核心功能与设计原理:** 该工具利用图神经网络 (GNN) 对蛋白质骨架及其周围化学环境进行建模，以预测合适的氨基酸身份。它基于每个残基的局部原子环境进行条件判断。ProteinMPNN 和 LigandMPNN 的成功，两者均基于图神经网络，凸显了 GNN 在捕捉精确序列设计所需的复杂三维结构和化学环境方面的卓越能力。蛋白质结构本质上是图状数据（残基为节点，相互作用或邻近关系为边），GNN 能够有效处理此类信息，这标志着从传统的基于物理的能量函数或简单统计模型向学习蛋白质序列-结构关系的转变。大规模结构数据库（如 PDB、AlphaFoldDB）的可用性以及 GNN 研究的进展，共同推动了这些复杂模型的开发。
* **主要特性:**
  * **速度快 (每个结构约一秒钟完成)。**
  * **无需专家定制。**
  * **在实验室测试中优于先前的最佳工具。**
  * **可与 RFdiffusion 等结构生成工具结合，设计具有新颖序列、结构和功能的蛋白质。**
* **应用场景:** 从头蛋白质设计、为提高稳定性或功能而重新设计现有蛋白质、为给定折叠生成序列库。
* **使用方法:**
  * **可用性:** 开源，GitHub 上提供：Baker 实验室原始版本 (dauparas/ProteinMPNN)，Kuhlman 实验室分支 (Kuhlman-Lab/proteinmpnn)。这些工具的计算效率和开源特性显著降低了复杂设计任务的门槛。
  * **输入:** 蛋白质结构 (PDB 文件)。Kuhlman 实验室分支使用 `<span class="selected">.flags</span>` 文件作为输入选项。
  * **输出:** 新的氨基酸序列 (FASTA 格式)。也可以输出序列概率。
  * **关键参数:**
    * `<span class="selected">--model_name</span>`: 指定模型检查点 (vanilla, soluble, Ca-only)。
    * `<span class="selected">--sampling_temp</span>`: 控制序列多样性 (0.0-1.0, 推荐 0.0-0.3)。
    * `<span class="selected">--fixed_positions_jsonl</span>`, `<span class="selected">--omit_AAs</span>`, `<span class="selected">--bias_AA_jsonl</span>`: 用于约束设计。
    * `<span class="selected">--backbone_noise</span>`: 向骨架原子添加噪声以增强鲁棒性。
    * `<span class="selected">--num_seq_per_target</span>`: 每个目标生成的序列数量。
  * **Kuhlman 实验室分支特性:**
    * **改进了自定义设计运行的输入解析。**
    * **支持多状态设计 (设计与多种构象状态兼容的序列)。**
    * **与 EvoPro 集成。**
    * **将输入选项组织到 **`<span class="selected">json.flags</span>` (设计约束) 和 `<span class="selected">proteinmpnn.flags</span>` (预测标志) 文件中。
    * **支持的协议包括：单体设计、结合剂设计、寡聚体设计 (具有对称性)、多状态设计。**
* **主要出版物:** Dauparas J, et al. Robust deep learning–based protein sequence design using ProteinMPNN.  *Science* **, 2022.**

#### 2. LigandMPNN

* **概述:** LigandMPNN 是 ProteinMPNN 的扩展，擅长创建与多种非蛋白质分子 (小分子、核酸、金属) 相互作用的蛋白质。由 IPD 开发。
* **核心功能与设计原理:** LigandMPNN 在 ProteinMPNN 的基础上，显式地将非蛋白质原子 (配体) 的空间和化学环境信息整合到序列设计过程中。它在蛋白质图之外还使用了一个配体图。这一进展标志着蛋白质设计能力向更广泛的分子系统扩展，不再局限于纯蛋白质系统或蛋白质-蛋白质相互作用。
* **主要特性:**
  * **编码邻近配体原子、元素类型 (对金属尤其重要)，并预测目标配体周围的侧链构象。**
  * **与其它方法相比，在与配体相互作用的残基的序列恢复率方面有显著提高 (10–40%)。**
  * **已通过实验验证可设计具有高亲和力和高特异性的小分子和DNA结合蛋白。**
  * **成功拯救了失效的小分子结合剂，设计了序列特异性的DNA结合剂，并安装了金属结合位点。**
  * **设计配体结合位点的速度远超传统工具。**
* **应用场景:** 设计酶、传感器、与特定小分子结合的治疗性蛋白质、DNA/RNA结合蛋白、金属蛋白。
* **使用方法:**
  * **可用性:** 开源，GitHub (dauparas/LigandMPNN)。
  * **输入:** 包含蛋白质和配体/金属的PDB文件。输入PDB使用Prody解析，保留残基索引、链字母和插入码。
  * **输出:** 设计的蛋白质序列 (FASTA) 和包含预测侧链构象的PDB文件。
  * **关键参数:** 与ProteinMPNN类似 (例如，`<span class="selected">--sampling_temp</span>`, `<span class="selected">--fixed_residues</span>`, `<span class="selected">--bias_AA</span>`)，外加指定配体链和原子的选项。`<span class="selected">run.py</span>` 脚本是主要接口。
  * **编码细节 (基于bioRxiv论文):**
    * **配体内部图，配体原子为节点 (独热编码的化学元素类型)，距离为边特征。**
    * **蛋白质-配体图的边编码蛋白质骨架原子 (N, Cα, C, O, Cβ) 与配体原子之间的距离。**
    * **侧链堆积神经网络自动回归预测χ角。**
* **主要出版物:** Dauparas J, et al. Atomic context-conditioned protein sequence design using LigandMPNN.  *Nature Methods* **, 2025 (预计)。预印本: Dauparas, J. et al. ***bioRxiv* 2023.12.22.573103.

#### 3. ProtFlow

* **概述:** ProtFlow 是一种基于流匹配 (Flow Matching) 的快速蛋白质序列设计框架，它在蛋白质语言模型 (pLM) 的压缩嵌入空间上运行。
* **核心功能与设计原理:** 利用pLM (ESM-2) 作为编码器，压缩其潜空间，并使用基于校正流的方法 (流匹配，Reflow) 进行高效、高质量的单步序列生成。旨在克服自回归和扩散模型在效率和训练成本方面的局限性。ProtFlow的出现，连同ProteinMPNN的速度优势，共同反映了计算效率在蛋白质设计领域的重要性。
* **主要特性:**
  * **据称是首个基于流匹配的蛋白质序列设计生成模型。**
  * **支持快速设计和高质量的单步生成。**
  * **包含针对多链蛋白质 (如抗体) 的联合设计流程。**
  * **由于潜空间压缩，在有限的计算资源上也能提高性能。**
* **应用场景:** 从头设计通用多肽、长链蛋白质、抗菌肽 (AMP) 和抗体。
* **使用方法:**
  * **可用性:** 论文 (arXiv:2504.10983) 将其描述为“首个基于流匹配的生成模型”，但代码可用性需查证。
  * **输入:** 训练时为蛋白质序列 `<span class="selected">x</span>`；推理时从随机噪声 `<span class="selected">ε</span>` 开始。
  * **输出:** 设计的蛋白质序列 `<span class="selected">x'</span>`。
  * **方法论:** 涉及pLM编码器、到潜空间 `<span class="selected">hc</span>` 的压缩器、学习向量场 `<span class="selected">vt</span>` 的流匹配 (FM) 模块以及用于生成的ODE求解器。使用Reflow技术加速。
* **主要出版物:** Kong Z, et al. ProtFlow: Fast Protein Sequence Design via Flow Matching on Compressed Protein Language Model Embeddings.  *arXiv:2504.10983* **, 2025.**

#### 4. TIMED (Three-dimensional Inference Method for Efficient Design)

* **概述:** TIMED 是一种基于卷积神经网络 (CNN) 的逆向折叠算法。
* **核心功能与设计原理:** 采用CNN，这被认为是强大而灵活的蛋白质序列设计架构。
* **主要特性:**
  * **使用PDBbench和AlphaFold2进行了广泛的基准测试。**
  * **ProtInvTree，一个相关或更新的进展，提出了一种用于逆向折叠的测试时奖励引导树搜索框架，旨在无需重新训练或微调即可实现最先进的性能并提高结构一致性/序列多样性。这似乎是对初始TIMED的改进。**
* **应用场景:** 逆向折叠——为目标蛋白质骨架设计序列。
* **使用方法:**
  * **可用性:** TIMED-design 是一个公开可用的Web工具: [https://pragmaticproteindesign.bio.ed.ac.uk/timed](https://pragmaticproteindesign.bio.ed.ac.uk/timed "null")。
  * **输入/输出/参数:** Web工具的详细信息可在其界面上找到。PDBench根据序列恢复率、精确率、召回率等评估方法。
* **主要出版物:** Castorina LV, et al.  *Protein Eng Des Sel* **, 2024 (gzae002) for TIMED。PDBench论文为Castorina et al. ** *Bioinformatics* **, 2023。ProtInvTree来自一篇arXiv预印本。**

### B. 结构生成工具 (从头设计)

**这些工具旨在从头开始或在某些基序或特性的条件下生成新的蛋白质骨架结构。扩散模型，如RFdiffusion和Protpardelle，已成为该领域的主导力量，显示出学习蛋白质结构复杂分布的强大能力。**

#### 1. RFdiffusion

* **概述:** RFdiffusion 是一种用于从头蛋白质结构设计的生成式AI模型，其灵感来源于AI图像生成器。由IPD开发。
* **核心功能与设计原理:** 利用基于扩散的深度学习模型将离散的原子云塑造成新的蛋白质骨架。它学习一个去噪过程来生成结构。这一原理借鉴了扩散模型在图像生成等其他生成任务中的成功经验。
* **主要特性:**
  * **可在数秒内生成新的蛋白质结构。**
  * **可以产生单体、寡聚体、结合剂等。**
  * **可以执行无条件生成，也可以基于基序进行条件生成 (基序支架化)。**
  * **支持对称寡聚体生成 (环状、二面体、四面体)。**
  * **在基序支架化方面显著优于先前的方法，如Constrained Hallucination和RFjoint Inpainting。**
* **应用场景:** 设计全新的蛋白质折叠、在新的骨架上构建功能基序、创建对称蛋白质组装体、设计蛋白质结合剂。《Nature》杂志曾报道其能在数秒内创建定制生物分子。
* **使用方法:**
  * **可用性:** 开源，GitHub (RosettaCommons/RFdiffusion)。也作为Google Colab Notebook提供。Kuhlman实验室也有一个分支。
  * **输入:** 无条件生成：期望长度。基序支架化：包含基序的输入PDB，以及指定基序区域和新片段长度的contig字符串。对称设计：对称类型和总长度。
  * **输出:** 生成的蛋白质结构的PDB文件。RFdiffusion本身生成的序列可能不是最优的，通常需要后续使用ProteinMPNN等工具进行序列设计。
  * **关键参数/Contigs:**
    * `<span class="selected">inference.num_designs</span>`: 要生成的设计数量。
    * `<span class="selected">contigmap.contigs</span>`: 定义如何构建蛋白质的字符串 (例如，`<span class="selected">'[100-150]'</span>` 用于无条件生成，`<span class="selected">'A10-25/0-0/B5-30'</span>` 用于支架化基序A10-25和B5-30并在其间断开链，长度范围用于新片段)。
    * `<span class="selected">inference.symmetry</span>`: 用于对称设计 (例如，`<span class="selected">c3</span>`, `<span class="selected">d2</span>`, `<span class="selected">tetrahedral</span>`)。
    * `<span class="selected">inference.output_prefix</span>`: 输出文件路径。
* **主要出版物:** Watson JL, et al. De novo design of protein structure and function with RFdiffusion.  *Nature* **, 2023.**

#### 2. RFdiffusion All-Atom

* **概述:** RFdiffusion All-Atom 是 RFdiffusion 的扩展，它使用生命的所有组成模块 (不仅仅是氨基酸) 来构建分子。这一进展标志着从头设计向更高真实性和功能相关性迈进。
* **核心功能与设计原理:** 将扩散模型框架扩展到处理蛋白质、DNA、RNA、离子和小分子。蛋白质的功能通常由侧链以及与非蛋白质元素的相互作用介导，因此仅有骨架的模型不足以设计这些功能细节。
* **主要特性:**
  * **广义生物分子建模与设计。**
  * **可以设计蛋白质-核酸复合物、蛋白质-小分子复合物。**
  * **一个使用RFdiffusionAA、ProteinMPNN、AlphaFold2、LigandMPNN和PyRosetta设计血红素结合蛋白的端到端设计流程已公开。**
* **应用场景:** 设计与DNA/RNA相互作用的蛋白质、设计结合特定小分子或金属离子的蛋白质、创建复杂的生物分子组装体。
* **使用方法:**
  * **可用性:** 开源，GitHub (baker-laboratory/rf_diffusion_all_atom)。
  * **输入/输出:** 与RFdiffusion类似，但增加了指定和生成非蛋白质组分的能力。血红素结合剂流程提供了一个实际例子，其中的小分子结合剂设计示例：`<span class="selected">inference.num_designs=1</span>`, `<span class="selected">contigmap.contigs=['150-150']</span>`, `<span class="selected">diffuser.T=100</span>`。输出包括PDB和轨迹文件。序列需要后续使用LigandMPNN进行设计。
* **主要出版物:** Krishna R, Wang Y, Ahern W, et al. Generalized biomolecular modeling and design with RoseTTAFold All-Atom.  *Science* **, 2024. ***注意：此出版物标题指向RoseTTAFold All-Atom，但IPD软件页面将其与RFdiffusion All-Atom的功能联系起来。RFdiffusion All-Atom的GitHub也将其列为相关进展。*

#### 3. Protpardelle

* **概述:** Protpardelle 是一种蛋白质结构的全原子扩散模型，可同时协同设计骨架、序列和侧链。
* **核心功能与设计原理:** 将所有侧链状态同时表示为一个“叠加态”，在样本生成过程中塌缩为单个残基类型和构象。使用简化的ODE进行扩散。
* **主要特性:**
  * **生成具有连贯序列和全原子结构的完整蛋白质。**
  * **侧链再现天然蛋白质的化学特征和行为。**
  * **可用于全原子蛋白质设计和以无骨架、无旋转异构体的方式支架化功能基序。**
  * **与类似的等变模型相比，计算量较小。**
* **应用场景:** 从头全原子蛋白质设计、基于侧链化学性质的功能基序支架化、设计序列通过侧链影响骨架构象（反之亦然）的蛋白质。
* **使用方法:**
  * **可用性:** 代码在GitHub上提供 (ProteinDesignLab/protpardelle)。
  * **输入:** 对于基序支架化，输入PDB和要重新采样的残基索引。模型本身在其扩散过程中处理加噪数据 `<span class="selected">xt</span>`。
  * **输出:** 生成的全原子蛋白质结构和序列。
  * **示例:**`<span class="selected">python draw_samples.py --type backbone --sampling_configdir configs/cond_sampling.yml --input_pdb example.pdb --cond_num_samples 2 --resample_idxs 0-25,71-80</span>`
* **主要出版物:** Chu AE, et al. An all-atom protein generative model.  *PNAS* **, 2024.**

**即使拥有先进的结构生成能力，像RFdiffusion这样的工具生成的骨架通常也需要其他方法（如ProteinMPNN/LigandMPNN）进行后续的序列设计。Protpardelle则尝试协同设计结构和序列。这突出了结构和序列设计之间的相互作用和整合潜力。蛋白质由其序列和结构共同定义，这两者本质上是相互关联的。生成骨架只是问题的一半。因此，开发集成的设计流程，或者像Protpardelle那样更紧密耦合甚至统一这两个过程的方法，将是未来的重要方向。当前工具集的模块化特性也允许研究人员根据需要混合和匹配组件。**

### C. 专业化蛋白质/肽设计工具

#### 1. EvoPro (Kuhlman Lab)

* **概述:** EvoPro 是一个基于遗传算法的蛋白质结合剂优化流程。
* **核心功能与设计原理:** 在遗传算法框架内使用深度学习模型 (AF2用于结构预测，ProteinMPNN用于序列优化)，进行紧密蛋白质结合剂的“计算机内进化”(in silico evolution)。还支持多状态设计。EvoPro的这种混合策略，即利用遗传算法协调深度学习模型，体现了组合不同计算策略以发挥各自优势解决复杂设计任务的趋势。
* **主要特性:**
  * **优化蛋白质结合剂以获得高精度和高亲和力。**
  * **集成AF2和ProteinMPNN (Kuhlman实验室版本)。**
  * **多状态设计能力 (设计与多种状态兼容的序列，例如结合态和非结合态，或不同构象)。**
* **应用场景:** 设计新的蛋白质结合剂、优化现有结合剂以提高亲和力或特异性、抗体工程。
* **使用方法:**
  * **可用性:** 开源，GitHub (Kuhlman-Lab/evopro)。需要GPU。
  * **输入:** 初始序列文件、EvoPro规范的YAML文件、AF2和ProteinMPNN的标志文件、`<span class="selected">residue_specs.json</span>` (定义序列、可突变残基、对称性)。
  * **输出:** 优化的蛋白质结合剂序列及其预测结构。
  * **方法论:** 遗传算法迭代应用突变，使用AF2预测结构，并使用ProteinMPNN优化预测结构的序列，以选择改进的结合特性。
  * **关键参数:** 用于 `<span class="selected">generate_json.py</span>` 的 `<span class="selected">json.flags</span>` (例如，`<span class="selected">--pdb</span>`, `<span class="selected">--sequence_file</span>`, `<span class="selected">--mut_res</span>`, `<span class="selected">--symmetric_res</span>`)。用于EvoPro设置的 `<span class="selected">evopro.yaml</span>`。AF2标志 (例如，`<span class="selected">--msa_mode single_sequence</span>`, `<span class="selected">--custom_msa_path</span>`)。
* **主要出版物:** Goudy OJ, et al. In silico evolution of protein binders with deep learning models for structure prediction and sequence design. *bioRxiv* (预印本)。GitHub仓库提到多状态设计的“预印本和更新代码即将发布”。

#### 2. DexDesign (OSPREY D-肽抑制剂扩展)

* **概述:** DexDesign 是 OSPREY 蛋白质设计软件的扩展，用于创建D-肽抑制剂。由Bruce Donald实验室开发。这类工具旨在解决传统药物和蛋白质疗法的局限性。
* **核心功能与设计原理:** 实现D-肽设计，D-肽因其对蛋白酶解的抗性而具有治疗潜力。OSPREY本身使用可证明的算法 (DEE/A*) 和基于系综的方法 (K*) 进行设计，并包含灵活性。DexDesign利用了新的技术，如最小柔性集、基于K*的突变扫描和逆丙氨酸扫描。
* **主要特性:**
  * **专门设计D-肽抑制剂。**
  * **利用OSPREY强大的设计框架。**
  * **已在PDZ结构域家族靶点上得到验证。**
  * **DexDesign算法涉及将L-受体/L-肽转化为D-构型对应物，从L-肽数据库中识别相似的L-肽骨架，用L-肽替换D-肽，重新设计侧链以优化与D-受体的结合，最后再次镜像L-受体和重新设计的L-肽，生成L-受体和D-肽的复合物。**
* **应用场景:** 治疗性D-肽抑制剂设计，特别适用于蛋白水解稳定性至关重要的靶点。已应用于与囊性纤维化和狂犬病相关的PDZ结构域。
* **使用方法:**
  * **可用性:** OSPREY是免费开源的，GitHub (donaldlab/OSPREY)。DexDesign在OSPREY中实现。
  * **输入:** L-受体/L-肽复合物的结构作为起点。OSPREY通常接受PDB结构、旋转异构体库、能量函数。
  * **输出:** 设计的D-肽序列及其预测的复合物结构。
  * **OSPREY通用用法:** OSPREY具有Python接口和GPU加速功能。教程和视频可在Donald实验室网站上找到。
* **主要出版物:** Guerin et al. 2024。具体论文可能是 "DexDesign: A new OSPREY-based algorithm for designing de novo D-peptide inhibitors" (来自ResearchGate，引用*Protein Science* 2024或类似期刊)。PMC11099876 也是DexDesign的关键参考文献。

#### 3. PepPrCLIP (Duke University)

* **概述:** PepPrCLIP 是一个基于AI的平台，可设计能够结合并摧毁先前“不可成药”的致病蛋白（特别是无序蛋白）的短肽。
* **核心功能与设计原理:** 受OpenAI的CLIP模型启发。使用在天然蛋白质序列上训练的生成算法 (PepPr) 设计“引导”肽，并使用改编的CLIP算法根据序列单独筛选这些肽以匹配其靶蛋白。
* **主要特性:**
  * **仅需靶标的氨基酸序列即可设计肽结合剂，适用于无序蛋白。**
  * **PepPr通过ESM-2潜空间的高斯扰动生成肽候选物。**
  * **CLIP组件筛选肽的靶标选择性相互作用。**
  * **在比较中，其速度和肽匹配优于RFDiffusion。**
  * **已在有序 (UltraID) 和无序 (β-catenin，滑膜肉瘤相关蛋白) 靶点上进行了实验验证。**
* **应用场景:** 针对具有挑战性的靶点（如与癌症和其他疾病相关的内在无序蛋白）设计治疗性肽。
* **使用方法:**
  * **可用性:** 学术界开源。通过Hugging Face (ubiquitx/pepprclip) 提供用户友好的Colab notebook。
  * **输入:** 靶蛋白的氨基酸序列。
  * **输出:** 肽候选物和指示结合可能性的分数。
  * **许可:** UbiquiTx许可，必须接受才能访问存储库内容。
* **主要出版物:** Bhat S, et al. De novo design of peptide binders to conformationally diverse targets with contrastive language modeling.  *Sci Adv* **, 2025.**

**这些专业化工具，如用于增强稳定性的D-肽的DexDesign和针对无序蛋白的PepPrCLIP，正在专门解决传统药物和蛋白质疗法的局限性，将设计范围扩展到具有挑战性的靶点。这反映了从通用蛋白质设计向高度应用集中的设计的转变，可能为目前缺乏有效治疗方法的多种疾病开辟新的治疗途径。**

## III. 蛋白质设计流程中的基本辅助工具

**蛋白质设计很少是一个单一步骤的过程，它依赖于一套辅助工具进行结构预测、模拟、分析和可视化。本节涵盖了支持设计周期的关键非商业化、广泛使用的工具。**

**表2：蛋白质设计基本辅助工具概览**

| **工具类别**              | **工具名称**                              | **在蛋白质设计流程中的主要作用**                              | **可用性 (GitHub/Web服务器/平台)**                            | **主要出版物 (若适用，关注2021年后)**                                                                      |
| ------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **结构预测**              | **RoseTTAFold & RFAA**                    | **预测初始结构、评估设计序列、训练模型；RFAA处理非蛋白元素**  | **GitHub: IPD UW**                                            | **Baek et al.** *Science* **, 2021; Krishna R, et al.** *Science* **, 2024**               |
| **结构预测**              | **ColabFold**                             | **便捷使用AlphaFold2/ESMFold进行高精度预测**                  | **Google Colab, GitHub: labdao/colabfold**                    | **Mirdita M, et al.** *Nature Methods* **, 2022; Kim G, et al.** *Nat Protoc.* **, 2025**  |
| **结构预测**              | **ESMFold**                               | **基于pLM的快速单序列结构预测**                               | **HuggingFace, ColabFold, API, GitHub: facebookresearch/esm** | **Lin Z, et al.** *Science* **, 2023**                                                             |
| **结构预测**              | **OpenFold**                              | **可训练的AlphaFold2复现，用于定制模型**                      | **GitHub: aqlaboratory/openfold**                             | **(基于AlphaFold2)**                                                                                       |
| **分子动力学(MD)模拟**    | **GROMACS**                               | **评估设计蛋白的稳定性、柔性、构象变化、相互作用**            | **www.gromacs.org, GitLab**                                   | **(持续更新)**                                                                                             |
| **MD模拟**                | **OpenMM**                                | **灵活的MD模拟平台，支持自定义力场/流程；OpenMMDL用于复合物** | **openmm.org, GitHub**                                        | **(持续更新); OpenMMDL: Hosseini et al.** *J Chem Inf Model* **, 2025 (推测)**                     |
| **MD模拟**                | **NAMD**                                  | **大规模生物分子体系的高性能MD模拟**                          | **ks.uiuc.edu/Research/namd/**                                | **(持续更新)**                                                                                             |
| **分子对接**              | **AutoDock Vina (v1.2.x) & AutoDock-GPU** | **评估设计蛋白与配体的结合模式和亲和力**                      | **GitHub: ccsb-scripps**                                      | **Eberhardt J, et al.** *J Chem Inf Model* **, 2021 (Vina 1.2.0)**                                 |
| **分子对接**              | **rDock**                                 | **高通量虚拟筛选 (HTVS)，结合模式预测**                       | **rdock.github.io**                                           | **(持续更新)**                                                                                             |
| **序列分析/变体效应预测** | **ESM-2相关工具 (如ESM-Effect)**          | **分析设计序列特性，预测突变效应，理解序列-功能关系**         | **GitHub: facebookresearch/esm, moritzgls/ESM-Effect**        | **Lin Z, et al.** *Science* **, 2023 (ESM2); Glaser M,** *bioRxiv* **, 2025 (ESM-Effect)** |
| **可视化**                | **PyMOL (开源版)**                        | **检查设计模型、分析相互作用、准备出版图表**                  | **pymol.org, GitHub: schrodinger/pymol-open-source, Conda**   | **(持续更新)**                                                                                             |
| **可视化**                | **UCSF ChimeraX**                         | **高级可视化与分析，集成AlphaFold/ESMFold获取等**             | **www.rbvi.ucsf.edu/chimerax/**                               | **(持续更新)**                                                                                             |
| **数据库**                | **UniProtKB**                             | **提供序列、功能注释作为设计参考**                            | **www.uniprot.org**                                           | **UniProt Consortium,***NAR*Database Issue (年度更新)                                                          |
| **数据库**                | **ESM Metagenomic Atlas**                 | **提供大量宏基因组预测结构，启发新骨架设计**                  | **API (ESMFold, Wolfram)**                                    | **Lin Z, et al.** *Science* **, 2023 (ESMFold);***bioRxiv*2025.04.23.650224 (AFESM)                    |

### A. 蛋白质结构预测

**高精度结构预测工具（如AlphaFold2、RoseTTAFold、ESMFold）是现代蛋白质设计的基础。它们为设计提供起始模型，允许对设计序列进行计算机内的验证，并且它们预测的结构构成了训练新设计算法的庞大数据集。蛋白质设计的“设计-构建-测试-学习”循环严重依赖于了解结构。如果设计的目标是特定的结构或由结构介导的功能，那么预测该结构是关键。AlphaFold2等工具在很大程度上解决了蛋白质折叠问题（至少对于单链和许多复合物而言），这是一个分水岭时刻，消除了基于结构设计的主要瓶颈。因此，蛋白质设计不再受限于实验确定的结构的可用性，研究人员现在几乎可以为任何已知序列或可以假设序列的蛋白质进行设计，极大地扩展了可设计的宇宙。这些预测器的准确性也为设计的序列提供了一个可靠（尽管并非绝对可靠）的过滤器。**

#### 1. RoseTTAFold & RoseTTAFold All-Atom (RFAA)

* **概述:** RoseTTAFold 使用神经网络进行快速准确的蛋白质结构预测。RFAA 将此功能扩展到模拟包含DNA、RNA、小分子和金属的蛋白质。
* **与设计的相关性:** RFAA 对于预测/评估那些旨在与非蛋白质元素相互作用的设计蛋白质的结构至关重要。虽然主要是预测性的，但其输出可以指导此类复合物的设计工作。
* **可用性:** GitHub (原始版, 全原子版)。
* **使用方法:** 输入蛋白质的FASTA，小分子的SDF/SMILES，核酸的FASTA + 类型。输出PDB和置信度指标。
* **主要出版物:** Baek et al.  *Science* **, 2021 (RoseTTAFold)。Krishna R, et al. ** *Science* **, 2024 (RFAA)。**

#### 2. ColabFold (用于AlphaFold2 & ESMFold的便捷使用)

* **概述:** ColabFold 通过Google Colaboratory和命令行工具使AlphaFold2和ESMFold易于使用，缩短了周转时间。
* **与设计的相关性:** 为没有大量计算资源的研究人员提供易于访问的高精度结构预测，这对于生成模板结构或验证设计至关重要。
* **可用性:** Google Colaboratory，命令行工具，GitHub (labdao/colabfold)。数据/代码位于 protocol.colabfold.com。
* **使用方法:** 输入蛋白质序列 (单体或复合物)。输出预测的PDB结构、置信度分数。支持构象采样。
* **主要出版物:** Mirdita M, et al.  *Nature Methods* **, 2022。Kim G, et al. ** *Nat Protoc.* **, 2025。**

#### 3. ESMFold (Meta AI)

* **概述:** ESMFold 是一种基于ESM-2蛋白质语言模型的端到端单序列3D结构预测器。
* **与设计的相关性:** 提供非常快速的结构预测，无需多序列比对 (MSA)，可用于快速筛选或在难以获得MSA时使用。已集成到ESM宏基因组图谱中。
* **可用性:** HuggingFace transformers, ColabFold, API, PyTorch Hub, fair-esm GitHub。
* **使用方法:** 输入单个蛋白质序列 (或用冒号分隔的多个链)。输出PDB结构。提供CPU卸载、分块、循环等选项。
* **主要出版物:** Lin Z, et al.  *Science* **, 2023.**

#### 4. OpenFold

* **概述:** OpenFold 是AlphaFold2的一个忠实、可训练的PyTorch复现，并进行了性能改进。由哥伦比亚大学开发。
* **与设计的相关性:** 允许研究人员在自定义数据集上训练/微调类似AlphaFold2的模型，从而可能针对特定的设计问题定制模型或探索新的折叠原理。内存效率高且GPU友好。
* **可用性:** GitHub (aqlaboratory/openfold, FOSS-Archives/Open-Folding 似乎是一个分支/存档)。
* **使用方法:** 支持使用JAX权重进行推理和使用DeepSpeed进行训练 (fp16/bfloat16)。需要下载参数和数据库。
* **主要出版物:** 摘要中没有OpenFold本身的特定论文，但它复现了AlphaFold2 (Jumper et al.  *Nature* **, 2021)。**

### B. 分子动力学 (MD) 与模拟

**MD工具对于评估设计蛋白质的动态行为、稳定性以及与配体或其他蛋白质的相互作用至关重要，从而超越了静态结构模型。一个设计良好的蛋白质在静态模型中可能看起来很好，但在真实（溶剂化、热化）环境中可能不稳定、错误折叠或不表现出期望的动态特性。MD模拟提供了在更真实的条件下探测构象系综、结合/解离事件和整体稳定性的方法，从而在昂贵的实验验证之前帮助筛选候选物，并提供对设计功能机制的更深入理解。**

#### 1. GROMACS

* **概述:** GROMACS 是一款广泛使用、功能多样且快速的开源MD模拟软件包，尤其适用于生物分子。
* **与设计的相关性:** 模拟设计的蛋白质以检查结构完整性、折叠、动力学和相互作用。
* **可用性:** 官方网站 (www.gromacs.org)，GitLab。
* **使用方法:**
  * **输入:** 拓扑文件 (`<span class="selected">.top</span>`)，坐标文件 (`<span class="selected">.gro</span>`, `<span class="selected">.pdb</span>`)，MD参数文件 (`<span class="selected">.mdp</span>`)。`<span class="selected">pdb2gmx</span>` 用于生成蛋白质拓扑，`<span class="selected">editconf</span>` 用于定义盒子，`<span class="selected">gmx solvate</span>` 用于溶剂化，`<span class="selected">gmx genion</span>` 用于添加离子。
  * **工作流程:** 能量最小化，NVT平衡 (温度)，NPT平衡 (压力/密度)，生产MD。
  * **输出:** 轨迹文件 (`<span class="selected">.xtc</span>`, `<span class="selected">.trr</span>`)，能量文件，日志文件。分析工具如 `<span class="selected">gmx rms</span>` (RMSD)，`<span class="selected">gmx rmsf</span>` (RMSF)。
* **教程:** 官方教程，Lemkul教程，ACS JPCB教程。

#### 2. OpenMM

* **概述:** OpenMM 是一个高性能、可定制、开源的分子模拟工具包，具有广泛的Python绑定。
* **与设计的相关性:** 灵活的平台，用于设置和运行设计蛋白质的模拟，特别适用于自定义力场或协议。OpenMMDL工具包专门辅助蛋白质-配体复合物的设置和分析。
* **可用性:** 官方网站 (openmm.org)，GitHub。通过Conda安装。
* **使用方法:**
  * **使用Python脚本进行系统设置 (PDB/Amber文件)，力场应用 (例如，Amber, CHARMM, 通过** `<span class="selected">openmmforcefields</span>`为配体应用OpenFF SMIRNOFF)，积分器定义，模拟执行 (最小化，动力学)。
  * **OpenMMDL 提供GUI (OpenMMDL Setup) 用于PDB/SDF输入、力场/水模型选择，并生成用于OpenMMDL Simulation和Analysis的模拟脚本。**
* **教程:** OpenMM研讨会，simple-simulate-complex GitHub，Bohrium教程，OpenMMDL论文。

#### 3. NAMD

* **概述:** NAMD 是一款并行MD代码，用于大规模生物分子系统的高性能模拟。
* **与设计的相关性:** 模拟大型设计蛋白质或复合物，评估稳定性和动力学。
* **可用性:** 官方网站 (ks.uiuc.edu/Research/namd/)。非商业和内部商业用途免费。
* **使用方法:**
  * **输入:** PDB (坐标)，PSF (拓扑，由VMD中的 `<span class="selected">psfgen</span>`生成)，力场参数 (例如，CHARMM)，NAMD配置文件 (`<span class="selected">.conf</span>`)。
  * **工作流程:** 与GROMACS类似：最小化，平衡 (NVT, NPT)，生产运行。
  * **输出:** 轨迹文件 (`<span class="selected">.dcd</span>`)，重启文件，日志文件。分析通常使用VMD完成。
* **教程:** UIUC/KS官方教程，LigParGen NAMD教程。

### C. 分子对接

#### 1. AutoDock Vina (v1.2.x) & AutoDock-GPU

* **概述:** AutoDock Vina 是一款广泛使用的开源分子对接程序。Vina 1.2.x (2021年后) 包含新的对接方法和扩展的力场。AutoDock-GPU 使用GPU加速对接。
* **与设计的相关性:** 评估设计的蛋白质 (受体) 与特定配体的结合情况。
* **可用性:** GitHub (ccsb-scripps/AutoDock-Vina, ccsb-scripps/AutoDock-GPU)。
* **使用方法:**
  * **输入:** PDBQT格式的受体和配体结构 (使用MGLTools, Meeko, 或 `<span class="selected">prepare_receptor</span>`/`<span class="selected">prepare_ligand</span>` 脚本制备)。定义搜索空间 (格点盒子)。
  * **工作流程:** 制备受体和配体，定义搜索盒子，运行Vina。
  * **输出:** 对接构象 (PDBQT)，结合亲和力分数 (kcal/mol)。
  * **关键参数:**`<span class="selected">exhaustiveness</span>` (控制搜索彻底性)，`<span class="selected">scoring</span>` (vina, ad4, vinardo)。
* **教程:** 官方文档 (autodock-vina.readthedocs.io)，YouTube教程。

#### 2. rDock

* **概述:** rDock 是一款快速、通用的开源程序，用于将配体对接到蛋白质和核酸，专为高通量虚拟筛选 (HTVS) 和结合模式预测而设计。
* **与设计的相关性:** 筛选配体库与设计蛋白质的结合，反之亦然。
* **可用性:** 官方网站 (rdock.github.io)。仅限Linux。
* **使用方法:**
  * **输入:** 配体和受体结构。空腔定义。
  * **工作流程:** 对接准备 (空腔定义，侧链旋转)，输入文件预处理 (限制性对接，格点预计算)，对接，后处理 (结果总结，RMSD计算)。
  * **输出:** 对接构象，打分，表格总结。
* **主要特性:** 显式溶剂，药效团约束，HTVS优化。

### D. 序列分析和变体效应预测

#### 1. 基于ESM-2的工具 (例如，ESM-Effect, 用于特征分类的ESM2微调)

* **概述:** 进化尺度模型 (ESM) 是从海量序列数据中学习表征的蛋白质语言模型 (pLM)。ESM-2是一个重要的版本。
* **ESM-Effect:** 微调ESM2以根据深度突变扫描 (DMS) 数据准确预测突变的功能效应。可在GitHub (moritzgls/ESM-Effect) 上获取。
* **用于特征分类的ESM2微调:** 微调ESM2以在氨基酸分辨率上对蛋白质特征 (活性位点、结合位点、PTM、二级结构) 进行分类。可用于了解错义变体如何影响蛋白质功能并重新分类意义不明的变体。
* **与设计的相关性:**
  * **ESM-Effect: 评估设计突变的潜在功能后果。**
  * **特征分类: 了解设计是否在特定位置保留或引入了期望的功能特征。**
* **可用性:** ESM-2模型可用。ESM-Effect代码在GitHub上。特征分类工作在一篇arXiv预印本中描述，摘要中未明确说明代码可用性。
* **使用方法:** 通常涉及提供蛋白质序列和突变。输出包括预测的效应或特征分类。
* **主要出版物:** ESM2: Lin Z, et al.  *Science* **, 2023。ESM-Effect: Glaser M, ** *bioRxiv* **, 2025。特征分类: Ahmed Z, et al. ** *arXiv* **, 2024。**

### E. 可视化软件

**PyMOL和ChimeraX等工具不仅仅用于制作精美的图片；它们是交互式分析平台，对于检查设计、识别缺陷、理解相互作用以及指导进一步的设计迭代至关重要。蛋白质设计涉及复杂的3D数据，视觉检查通常是理解设计是否在结构上合理、配体是否正确对接或突变是否恰当的最直观方法。随着设计工具产生越来越多的候选方案，高效的可视化和分析对于决策变得至关重要。这些工具使研究人员能够将其专业知识和直觉应用于设计过程。**

#### 1. PyMOL (开源版本)

* **概述:** PyMOL 是一款广泛使用的分子可视化系统，具有基于Python的命令行。提供开源版本。
* **与设计的相关性:** 可视化设计的蛋白质结构、突变、界面、配体结合。创建出版质量的图像和动画。
* **可用性:** 通过安装程序 (例如，来自Christoph Gohlke) 或从源代码构建 (GitHub: schrodinger/pymol-open-source) 获取开源PyMOL。可通过Conda安装。
* **使用方法:** 加载PDB/CIF文件，各种分子表示 (卡通图、表面图、棒状图)，选择，着色，测量，用于复杂场景的脚本编写，静电势可视化。
* **教程:** PyMOL Wiki，Omicstutorials，YouTube。

#### 2. UCSF ChimeraX

* **概述:** UCSF ChimeraX 是RBVI推出的下一代分子可视化程序，是Chimera的继任者。非商业用途免费。
* **与设计的相关性:** 先进的可视化和分析功能，包括与AlphaFold/ESMFold获取、旋转异构体分析、突变工具、界面分析 (碰撞、接触、氢键)、对接结果查看等工具的集成。
* **可用性:** 从 rucsf.edu/chimerax 下载。
* **使用方法:** 命令行和GUI操作。用于结构构建/编辑、环区建模 (通过Modeller)、比较建模、序列查看、VR的工具。
* **教程:** ChimeraX网站上的官方用户指南和教程/视频，YouTube。

### F. 关键数据库和资源

#### 1. UniProtKB (通用蛋白质知识库)

* **概述:** UniProtKB 是一个全面、高质量、免费访问的蛋白质序列和功能信息资源。包含Swiss-Prot (手动注释) 和TrEMBL (计算注释)。
* **与设计的相关性:** 分析蛋白质序列的来源、设计靶标的参考序列、指导设计目标的功能信息。
* **可用性:** uniprot.org。

#### 2. ESM Metagenomic Atlas (ESMAtlas)

* **概述:** ESMAtlas 包含超过6亿个来自未培养微生物的预测蛋白质结构，由ESMFold生成。与AlphaFold DB合并为AFESM (8.21亿条目)。
* **与设计的相关性:** 结构和序列多样性的巨大存储库，特别是来自未充分探索的宏基因组来源。可以揭示新的结构域组合并扩展已知蛋白质折叠空间的覆盖范围，为新的设计支架提供灵感。API允许获取结构或折叠序列。
* **可用性:** 通过API访问 (例如，Wolfram Language，ESMFold API)。

## IV. 集成蛋白质设计工作流程的概念化

### A. 迭代设计的一般原则

**蛋白质工程中的“设计-构建-测试-学习”循环是核心方法论。计算工具通过在实验验证之前实现计算机内的快速迭代，极大地加速了这一循环。无论是哪种特定工具，成功的蛋白质设计都依赖于一个迭代循环，即生成设计方案，预测其特性（尤其是结构），并验证这些预测（最初是计算机模拟，然后是实验验证）。这种方法反映了科学方法：提出假设（设计）、预测结果、检验预测。计算工具正在加速这个循环的每一步，允许在投入昂贵的实验之前进行更多的迭代。**

### B. 示例工作流程1：从头酶设计

* **目标:** 设计一种新型酶来催化特定反应。
* **步骤与工具集成:**
  1. **活性位点定义:** 定义期望的催化几何结构 (例如，关键催化残基的位置、过渡态类似物)。
  2. **骨架生成:** 使用 **RFdiffusion** 或 **Protpardelle** 在活性位点基序的条件下生成新的蛋白质骨架。如果涉及辅因子，可使用 RFdiffusion All-Atom。
  3. **序列设计:** 如果过渡态类似物或辅因子是基序的一部分，则使用  **LigandMPNN** **；否则使用 ****ProteinMPNN** 为生成的骨架设计序列。
  4. **结构预测与初步筛选:** 使用 **ColabFold (AlphaFold2/ESMFold)** 或 **RoseTTAFold All-Atom** 预测设计序列的结构，检查它们是否按预期折叠以及活性位点几何结构是否保持。
  5. **对接 (底物/产物):** 使用 **AutoDock Vina** 或 **rDock** 对接底物和产物，评估结合相容性。
  6. **MD模拟:** 使用 **GROMACS** 或 **OpenMM** 模拟有希望的候选物，评估活性位点稳定性、柔性和与底物/辅因子的相互作用。
  7. **可视化与分析:** 在整个过程中使用 **PyMOL** 或 **ChimeraX** 进行检查和分析。
  8. **迭代:** 根据计算机模拟评估结果，优化活性位点、骨架或序列。

### C. 示例工作流程2：治疗性抗体/结合剂设计

* **目标:** 设计一种与靶蛋白高亲和力结合的结合剂 (例如，抗体片段、定制肽)。
* **步骤与工具集成:**
  1. **靶标结构:** 获取靶蛋白结构 (实验或由 **AlphaFold2/RoseTTAFold** 预测)。
  2. **初始结合剂生成/优化:**
     * **对于抗体样结合剂：使用 ****EvoPro** 进化现有结合剂序列或从头设计针对靶标的结合剂，利用AF2进行结构预测，ProteinMPNN进行序列优化。
     * **对于针对无序靶标的肽：使用 ** **PepPrCLIP** **，输入靶标序列。**
     * **对于D-肽：使用 ** **DexDesign (OSPREY)** **。**
  3. **界面序列设计:** 如果RFdiffusion生成了通用骨架，则使用 **LigandMPNN** 设计与靶标结合的界面残基。
  4. **复合物结构预测:** 使用 **RoseTTAFold All-Atom** 或 **AlphaFold-Multimer** (通过ColabFold) 预测设计的结合剂-靶标复合物的结构。
  5. **对接 (优化):** 如果需要，使用 **AutoDock Vina** 或其他对接工具优化结合姿势。
  6. **MD模拟:** 使用 **GROMACS/OpenMM/NAMD** 模拟复合物，评估结合稳定性、界面动力学，并计算结合自由能 (高级)。
  7. **变体效应预测 (用于优化):** 如果优化现有结合剂，使用 **ESM-Effect** 或类似工具指导突变。
  8. **可视化与分析:** 使用 **PyMOL/ChimeraX** 检查结合界面、接触、氢键。

**当前蛋白质设计工具生态系统具有高度模块化的特点。研究人员通常可以针对设计工作流程的各个阶段“即插即用”不同的工具，发挥每种工具的优势。许多工具专为特定任务（序列设计、结构生成、预测、模拟）而设计，并具有兼容的输入/输出格式（例如PDB、FASTA）。这种模块化趋势源于蛋白质设计的复杂性，单一工具难以在所有方面都达到最优。专业化使得工具能够进行重点开发和优化，而开源特性和通用文件格式则促进了互操作性。这意味着研究人员可以根据其特定需求和可用资源定制设计流程。这种灵活性非常强大，但也要求用户充分理解每种工具的功能以及如何有效地组合它们。例如，使用RFdiffusionAA、ProteinMPNN、AlphaFold2、LigandMPNN和PyRosetta的血红素结合蛋白设计流程就体现了这种模块化和可组合性。**

## V. 结论与未来展望

### A. 当前格局总结

**自2021年以来，开源蛋白质设计工具领域取得了显著进展，尤其受到AI和深度学习的深刻影响。目前，研究人员可以利用一系列强大的非商业化工具进行序列设计、结构生成、特定功能设计、结构预测、动态模拟和结果分析。这些工具的涌现，极大地推动了蛋白质工程领域的发展。**

### B. 新兴趋势与挑战

* **面向功能的设计:** 从仅仅关注结构转向直接设计特定功能，包括催化活性、动态特性和变构效应。
* **多约束优化:** 设计同时满足多种标准的蛋白质 (例如，稳定性、亲和力、特异性、可表达性)。多状态设计是朝这个方向迈出的一步。
* **处理非经典氨基酸和化学修饰:** 将设计能力扩展到20种标准氨基酸之外。
* **改进生成模型:** 提高生成模型的可控性、减少偏差、提高采样效率。
* **实验验证瓶颈:** 尽管计算设计正在加速，但实验验证仍然是速率限制步骤。能够更好地预测实验成功率或与自动化生物铸造厂集成的工具将具有重要价值。
* **深度学习模型的可解释性:** 理解DL模型为何做出某些设计选择仍然是一个挑战。

### C. 未来展望

**未来，预计AI将与基于物理的原理进一步融合，计算设计将与高通量自动化实验更紧密地结合。计算蛋白质设计有望在医药、材料科学和可持续发展等领域应对重大的社会挑战。**

**尽管开源工具普及了技术的使用，但其有效应用仍然需要结构生物学、生物物理学，通常还有计算科学方面的深厚专业知识。例如，ProteinMPNN的许多参数和RFdiffusion的contig字符串的设置，以及MD模拟的复杂流程，都需要用户具备相当的理解。错误应用或错误解读结果是一个潜在的风险。因此，随着工具越来越普及，对健全的培训、清晰的文档和最佳实践指南的需求也日益增长，以确保这些强大的工具被更广泛的社区正确有效地使用。**

**该领域显然正在从仅仅设计目标折叠，转向设计特定的动态行为、复杂的相互作用，并最终实现新颖的生物或化学功能。LigandMPNN、RFdiffusion All-Atom、Protpardelle、EvoPro、DexDesign 和 PepPrCLIP 等工具都面向功能方面（结合、催化、特定环境下的稳定性）。MD模拟被用于评估动态特性。设计“自然界不存在的功能”和侧链作为“主要的功能效应子”被日益强调。静态结构通常不足以定义功能，功能源于动力学、相互作用和对环境的响应。这标志着该领域从“折叠设计”向“功能设计”的成熟。早期工具和突破使得可靠地设计和预测稳定折叠成为可能，为应对设计功能这一更复杂的挑战铺平了道路。这将需要新型计算模型，能够更准确地预测和优化动态特性、变构调控、催化机制和相互作用特异性，同时也意味着更需要整合与功能（而不仅仅是结构）相关的实验反馈。**

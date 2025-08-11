export default function decorate(block) {
  const markup = `
    <div id="order-accordion">
        <ul id="test-package-list">
            <li>
                <div class="test-package">
                    <div class="test-summary">
                        <div class="title-column">
                            <div class="test-header">
                                <span class="test-title">MyRisk <span class="reg-mark">&reg;</span></span>
                                <span class="test-description">Hereditary Cancer Test</span>
                            </div>
                        </div>
                        <div class="description-column">
                            <span class="test-description">A multi-gene hereditary cancer panel that helps determine the risk of certain cancers, with a focus on 11 primary indications.</span>
                        </div>
                        <button class="details-toggle"><span class="icon arrow-up"></span></button>
                    </div>
                    <div class="test-details">
                        <div class="detail-column detail-info">
                            <span class="test-detail">Detail 1</span>
                        </div>
                        <div class="detail-column detail-options">
                            <span class="test-detail">Detail 2</span>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="test-package">
                    <div class="test-summary">
                        <div class="title-column">
                            <div class="test-header">
                                <span class="test-title">Foresight <span class="reg-mark">&reg;</span></span>
                                <span class="test-description">Carrier Screen</span>
                            </div>
                        </div>
                        <div class="description-column">
                            <span class="test-description">Determine if parents are at an increased risk of passing inherited conditions to children, such as Cystic Fibrosis.</span>
                        </div>
                        <button class="details-toggle"><span class="icon arrow-up"></span></button>
                    </div>
                    <div class="test-details">
                        <div class="detail-column detail-info">
                            <span class="test-detail">Detail 1</span>
                        </div>
                        <div class="detail-column detail-options">
                            <span class="test-detail">Detail 2</span>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="test-package">
                    <div class="test-summary">
                        <div class="title-column">
                            <div class="test-header">
                                <span class="test-title">Prequel <span class="reg-mark">&reg;</span></span>
                                <span class="test-description">Prenatal Screen</span>
                            </div>
                        </div>
                        <div class="description-column">
                            <span class="test-description">Determine a risk of a fetus</span>
                        </div>
                        <button class="details-toggle"><span class="icon arrow-up"></span></button>
                    </div>
                    <div class="test-details">
                        <div class="detail-column detail-info">
                            <p class="detail-title">Prequel &reg; Prenatal Screening</p>
                            <p>A prenatal Cell Free DNA (pcfDNA) screen that can determine if a pregnancy is at an increased risk for chromosomal conditions like Down, Edwards or Patau syndromes, and provides the predicated fetal sex.</p>
                            <p><strong>When to test:</strong> 8 weeks pregnant</p>
                            <ul>
                                <li>&checkmark; 1 blood sample</li>
                                <li>&checkmark; 7-10 days turnaround time</li>
                            </ul>
                            <div class="benefits-container">
                                <div class="package-benefit">
                                    <div class="icon">$0</div>
                                    <div class="benefit-description">Most patients are covered by insurance and pay $0.</div>
                                </div>
                                <div class="package-benefit">
                                    <div class="icon"></div>
                                    <div class="benefit-description">Direct payment options and financial assistance are available for qualified individuals.</div>
                                </div>
                            </div>
                            <div class="sample-report">
                                <span class="icon report"></span>Sample Report
                            </div>
                        </div>
                        <div class="detail-column detail-options">
                        <div>* Required information</div>
                            <p>Included</p>
                            <ul>
                                <li>&checkmark; Chromasome 13 (Patau syndrome)</li>
                                <li>&checkmark; Chromasome 18 (Edwards syndrome)</li>
                                <li>&checkmark; Chromasome 21 (Down syndrome)</li>
                            </ul>
                            <form>
                                <div>
                                    <p>Pregnancy Type *</p>
                                    <input type="radio" id="singleton" name="pregnancy-type" value="singleton">
                                    <label for="singleton">Singleton</label><br>
                                    <input type="radio" id="multiples" name="pregnancy-type" value="multiples">
                                    <label for="multiples">Twins/higher order multiples</label>
                                </div>
                                <div>
                                <p>Additions (optional)</p>
                                    <input type="checkbox" id="sca" name="additions" value="sca">
                                    <label for="sca">Sex chromasome analysis <span class="icon info"></span></label>
                                    <input type="checkbox" id="microdeletions" name="additions" value="microdeletions">
                                    <label for="microdeletions">Microdeletions <span class="icon info"></span></label>
                                    <input type="checkbox" id="eaa" name="additions" value="eaa">
                                    <label for="eaa">Expanded Aneuploidy Analysis (EAA) <span class="icon info"></span></label>
                                </div>
                                <div>
                                    <button type="button">Add to order</button>
                                    <button type="submit">Order now</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="test-package">
                    <div class="test-summary">
                        <div class="title-column">
                            <div class="test-header">
                                <span class="test-title">Foresight <span class="reg-mark">&reg;</span></span>
                                <span class="test-description">Carrier Screening</span>
                            </div>
                            <span class="plus">+</span>
                            <div class="test-header">
                                <span class="test-title">Prequel <span class="reg-mark">&reg;</span></span>
                                <span class="test-description">Prenatal Screen</span>
                            </div> 
                        </div>
                        <div class="description-column">
                            <span class="test-description">Order both test kits with one form.</span>
                        </div>
                        <button class="details-toggle"><span class="icon arrow-up"></span></button>
                    </div>
                    <div class="test-details">
                        <div class="detail-column detail-info">
                            <span class="test-detail">Detail 1</span>
                        </div>
                        <div class="detail-column detail-options">
                            <span class="test-detail">Detail 2</span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>`;

  block.innerHTML = markup;

  const toggleButtons = document.getElementsByClassName("details-toggle");

  for (const button of toggleButtons) {
    button.addEventListener("click", () => {
      const testPackageContainer = button.closest(".test-package");
      testPackageContainer.classList.toggle("show");
    });
  }
}

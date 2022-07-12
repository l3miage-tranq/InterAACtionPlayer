import { TestBed } from '@angular/core/testing';

import { DwelltimeService } from './dwelltime.service';

describe('DwelltimeService', () => {
  let service: DwelltimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DwelltimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setSizeDwellTimeSpinner:: should set size to spinner', () => {
    spyOn(service.dwellTimeSpinnerSize, 'next');
    service.dwellTimeSpinnerOutsideBtn = true;
    service.setSizeDwellTimeSpinner();
    expect(service.dwellTimeSpinnerSize.next).toHaveBeenCalledOnceWith(190);
  });

  it('setSizeDwellTimeSpinner:: should set size to spinner', () => {
    spyOn(service.dwellTimeSpinnerSize, 'next');
    service.dwellTimeSpinnerOutsideBtn = false;
    service.setSizeDwellTimeSpinner();
    expect(service.dwellTimeSpinnerSize.next).toHaveBeenCalledOnceWith(150);
  });

  it('getSizeDwellTimeSpinner:: should return size to spinner', () => {
    service.dwellTimeSpinnerOutsideBtn = false;
    expect(service.getSizeDwellTimeSpinner()).toEqual(150);
  });

  it('setDiskProgress:: should set value to disk progress', () => {
    spyOn(service.diskProgressObs, 'next');
    service.diskProgress = true;
    service.setDiskProgress();
    expect(service.diskProgressObs.next).toHaveBeenCalledOnceWith(true);
  });

  it('setConfiguration:: should set configurations to service', () => {
    service.setConfiguration({
      dwellTime: false,
      dwellTimeValue: 1,
      spinnerDwellTimeOutside: false,
      diskProgress: true
    } as any);
    expect(service.dwellTime).toEqual(false);
    expect(service.diskProgress).toEqual(true);
    expect(service.getConfiguration()).toEqual({
      dwellTime: false,
      dwellTimeValue: 1,
      spinnerDwellTimeOutside: false,
      diskProgress: true
    });
  });
});

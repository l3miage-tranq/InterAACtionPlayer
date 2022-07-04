import { TestBed } from '@angular/core/testing';
import { AudioService } from './audio.service';

describe('AudioService', () => {
  let service: AudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('emitVolumeSlider:: should set volume value', () => {
    service.displayVolumeSlider = false;
    service.emitVolumeSlider();
    expect(service.displayVolumeSlider).toBeTruthy();
  });

  it('emitDecreaseVolume:: should set volume value', () => {
    service.volume = 5;
    service.emitDecreaseVolume();
    expect(service.volume).toEqual(0);
    service.volume = 1;
    service.emitDecreaseVolume();
    expect(service.volume).toEqual(0);
    service.volume = 0;
    service.emitDecreaseVolume();
    expect(service.volume).toEqual(0);
  });

  it('emitIncreaseVolume:: should set volume value', () => {
    service.volume = 94;
    service.emitIncreaseVolume();
    expect(service.volume).toEqual(99);
    service.volume = 96;
    service.emitIncreaseVolume();
    expect(service.volume).toEqual(100);
    service.volume = 105;
    service.emitIncreaseVolume();
    expect(service.volume).toEqual(105);
  });
});
